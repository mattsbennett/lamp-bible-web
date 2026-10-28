#!/usr/bin/env python3
"""
Checks every published sample module by doing what the apps do: decompress the
raw DEFLATE stream, open the result as SQLite, and read something back out.

    python3 scripts/verify_sample_modules.py

Run this after build_sample_modules.py. It is also a short worked example of
reading a .lamp file from another language or toolchain.

When the command-line tool from lamp-bible-core (the Swift package the apps
share) is available, each sample is also checked against the apps' own code:

    lamp-module inspect   the source JSON passes the apps' validator;
    lamp-module build     the apps' compiler, given the same JSON, produces the
                          same tables, columns and rows as build_sample_modules.py;
    lamp-module verify    the .lamp installs the way the apps install it, as the
                          right type and under the right ID.

The tool is looked for at $LAMP_CORE_CLI, then at
../lamp-bible-core/.build/debug/lamp-module. Without it those checks are skipped.
"""

import json
import os
import re
import sqlite3
import subprocess
import sys
import tempfile
import zlib
from contextlib import contextmanager
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SAMPLES = REPO / 'public/modules/samples'
FORMAT_VERSION = '1.0'

# Per module type: the sample's module ID, which is also its file name, and
# one representative query with the row count we expect.
CHECKS = {
    'translation': ('SAMPLEs', 'SELECT count(*) FROM verses', 6),
    'dictionary': ('sample-lexicon', 'SELECT count(*) FROM dictionary_entries', 3),
    'commentary': ('sample-commentary', 'SELECT count(*) FROM commentary_units', 3),
    'book': ('sample-book', 'SELECT count(*) FROM book_sections', 3),
    'plan': ('sample-plan', 'SELECT count(*) FROM plan_days', 7),
    'quiz': ('sample-quiz', 'SELECT count(*) FROM quiz_questions', 10),
    'notes': ('sample-notes', 'SELECT count(*) FROM note_entries', 3),
    'devotional': ('sample-devotional', 'SELECT count(*) FROM devotional_entries', 1),
    'highlights': ('sample-highlights', 'SELECT count(*) FROM highlights', 4),
}


def read_lamp(path: Path) -> bytes:
    """Decompress a .lamp file. wbits=-15 means raw DEFLATE, no header."""
    return zlib.decompressobj(wbits=-15).decompress(path.read_bytes())


@contextmanager
def open_lamp(path: Path):
    """Open a .lamp as a SQLite connection, via a temporary file."""
    with tempfile.NamedTemporaryFile(suffix='.db') as tmp:
        tmp.write(read_lamp(path))
        tmp.flush()
        conn = sqlite3.connect(tmp.name)
        try:
            yield conn
        finally:
            conn.close()


def check_module(kind: str, failures: list) -> None:
    """Check one sample's files, container, database and identity."""
    module_id, query, expected = CHECKS[kind]
    lamp = SAMPLES / kind / f'{module_id}.lamp'
    source = SAMPLES / kind / f'{module_id}.json'
    for path in (lamp, source):
        if not path.exists():
            failures.append(f'{kind}: missing {path.relative_to(REPO)}')
            return

    meta = json.loads(source.read_text())['meta']
    if meta.get('id') != module_id:
        failures.append(f'{kind}: {source.name} has meta.id {meta.get("id")!r}')

    try:
        data = read_lamp(lamp)
    except zlib.error as exc:
        failures.append(f'{kind}: not a raw DEFLATE stream ({exc})')
        return
    if not data.startswith(b'SQLite format 3\x00'):
        failures.append(f'{kind}: decompressed payload is not a SQLite database')
        return

    with open_lamp(lamp) as conn:
        try:
            integrity = conn.execute('PRAGMA integrity_check').fetchone()[0]
            if integrity != 'ok':
                failures.append(f'{kind}: integrity check said {integrity!r}')
                return
            if conn.execute('PRAGMA foreign_key_check').fetchall():
                failures.append(f'{kind}: foreign key check found orphaned rows')
            # The row the apps read first: which module this is, and what type.
            identity = conn.execute(
                'SELECT format_version, module_type, module_id FROM module_format'
            ).fetchall()
            count = conn.execute(query).fetchone()[0]
        except sqlite3.Error as exc:
            failures.append(f'{kind}: {exc}')
            return

    if identity != [(FORMAT_VERSION, kind, module_id)]:
        failures.append(f'{kind}: module_format holds {identity}, '
                        f'expected one row {(FORMAT_VERSION, kind, module_id)}')
    status = 'ok' if count == expected else f'expected {expected}'
    if count != expected:
        failures.append(f'{kind}: {query} returned {count}, {status}')
    print(f'  {kind:12} {lamp.name:24} {len(lamp.read_bytes()):>6,} bytes  {count:>2} rows  {status}')


def check_offsets(failures: list) -> None:
    """
    Confirm every annotation, footnote marker and highlight offset lands on the
    text it claims.

    A wrong offset is the one error in this format that produces a perfectly
    valid file which behaves wrongly, so it is worth asserting rather than
    eyeballing.
    """
    def walk(value, found):
        """Collect every annotated text, and every footnote ID, in a document."""
        if isinstance(value, dict):
            if isinstance(value.get('text'), str) and (
                    'annotations' in value or 'footnote_refs' in value):
                found['texts'].append(value)
            notes = value.get('footnotes')
            for note in notes if isinstance(notes, list) else []:
                if isinstance(note, dict) and 'id' in note:
                    found['footnotes'].add(note['id'])
            for child in value.values():
                walk(child, found)
        elif isinstance(value, list):
            for child in value:
                walk(child, found)

    for kind, (module_id, _, _) in CHECKS.items():
        path = SAMPLES / kind / f'{module_id}.json'
        if not path.exists():
            continue
        found = {'texts': [], 'footnotes': set()}
        walk(json.loads(path.read_text()), found)
        for body in found['texts']:
            text = body['text']
            for a in body.get('annotations', []):
                actual = text[a['start']:a['end']]
                if not 0 <= a['start'] < a['end'] <= len(text) or actual != a.get('text', actual):
                    failures.append(f"{kind}: annotation says {a.get('text')!r} but offsets "
                                    f"{a['start']}-{a['end']} cover {actual!r}")
            for marker in body.get('footnote_refs', []):
                if not 0 <= marker['offset'] <= len(text):
                    failures.append(f"{kind}: footnote {marker['id']} at {marker['offset']} "
                                    f'is outside text of length {len(text)}')
                if marker['id'] not in found['footnotes']:
                    failures.append(f"{kind}: footnote marker {marker['id']!r} has no footnote")

    # Highlights are offsets into another module's text: the translation's.
    translation = json.loads((SAMPLES / 'translation' / f"{CHECKS['translation'][0]}.json")
                             .read_text())
    verse_text = {
        verse['ref']: verse['content']['text']
        for book in translation['books']
        for chapter in book['chapters']
        for verse in chapter['verses']
    }
    highlights = json.loads((SAMPLES / 'highlights' / f"{CHECKS['highlights'][0]}.json")
                            .read_text())
    if highlights['meta']['translationId'] != translation['meta']['id']:
        failures.append('highlights: translationId does not name the sample translation')
    for entry in highlights['verses']:
        text = verse_text.get(entry['ref'])
        if text is None:
            failures.append(f"highlights reference verse {entry['ref']} not in the translation")
            continue
        for h in entry['highlights']:
            if not (0 <= h['sc'] < h['ec'] <= len(text)):
                failures.append(
                    f"highlights {entry['ref']}: span {h['sc']}-{h['ec']} "
                    f'outside verse of length {len(text)}'
                )


# ---------------------------------------------------------------------------
# Checks against the apps' own code
# ---------------------------------------------------------------------------

def find_core_cli():
    """The lamp-module tool, if present, and a reason when it is not."""
    configured = os.environ.get('LAMP_CORE_CLI')
    path = Path(configured) if configured else (
        REPO.parent / 'lamp-bible-core/.build/debug/lamp-module')
    if path.is_file() and os.access(path, os.X_OK):
        return path, None
    if configured:
        return None, f'LAMP_CORE_CLI is set to {configured}, which is not an executable'
    return None, None


def run(cli: Path, *args) -> subprocess.CompletedProcess:
    return subprocess.run([str(cli), *map(str, args)], capture_output=True, text=True)


def describe(conn) -> dict:
    """Every table's columns, every index's columns, and every trigger, by name."""
    shape = {}
    for kind, name, table in conn.execute(
            "SELECT type, name, tbl_name FROM sqlite_master "
            "WHERE name NOT LIKE 'sqlite\\_%' ESCAPE '\\'"):
        if kind == 'table':
            # name, type, not null, default, primary key position
            shape[name] = [row[1:] for row in conn.execute(f'PRAGMA table_info("{name}")')]
        elif kind == 'index':
            shape[name] = (table, [row[2] for row in conn.execute(f'PRAGMA index_info("{name}")')])
        else:
            shape[name] = kind
    return shape


def content_tables(conn) -> list:
    """Tables holding module data: not SQLite's own, and not a search index."""
    tables = conn.execute(
        "SELECT name, sql FROM sqlite_master WHERE type = 'table' "
        "AND name NOT LIKE 'sqlite\\_%' ESCAPE '\\'").fetchall()
    indexes = [name for name, sql in tables if sql.upper().startswith('CREATE VIRTUAL')]
    return sorted(name for name, _ in tables
                  if not any(name == i or name.startswith(f'{i}_') for i in indexes))


def rows(conn, table: str) -> list:
    """A table's rows, with JSON columns parsed so formatting cannot differ."""
    columns = [row[1] for row in conn.execute(f'PRAGMA table_info("{table}")')]
    result = []
    for row in conn.execute(f'SELECT * FROM "{table}"'):
        result.append([json.loads(v) if c.endswith('_json') and v is not None else v
                       for c, v in zip(columns, row)])
    return sorted(result, key=lambda r: json.dumps(r, sort_keys=True))


def compare_with_core_build(cli: Path, kind: str, ours: Path, source: Path) -> list:
    """Compile the source JSON with the apps' compiler and diff the two databases."""
    module_id = CHECKS[kind][0]
    with tempfile.TemporaryDirectory() as tmp:
        theirs = Path(tmp) / f'{module_id}.lamp'
        result = run(cli, 'build', source, theirs)
        if result.returncode != 0:
            return [f'lamp-module build failed: {(result.stderr or result.stdout).strip()}']
        with open_lamp(ours) as a, open_lamp(theirs) as b:
            shape_a, shape_b = describe(a), describe(b)
            problems = [
                f'{name}: ours {shape_a.get(name)}, core builds {shape_b.get(name)}'
                for name in sorted(set(shape_a) | set(shape_b))
                if shape_a.get(name) != shape_b.get(name)
            ]
            if problems:
                return problems
            return [f'{table}: rows differ from the ones core builds'
                    for table in content_tables(a) if rows(a, table) != rows(b, table)]


def check_with_core(cli: Path, failures: list) -> None:
    for kind, (module_id, _, _) in CHECKS.items():
        source = SAMPLES / kind / f'{module_id}.json'
        lamp = SAMPLES / kind / f'{module_id}.lamp'
        if not (source.exists() and lamp.exists()):
            continue  # Already reported.
        problems = []

        inspected = run(cli, 'inspect', source)
        if inspected.returncode != 0 or f': valid {kind}' not in inspected.stdout:
            problems.append(f'lamp-module inspect: {inspected.stdout.strip()}')

        problems += compare_with_core_build(cli, kind, lamp, source)

        verified = run(cli, 'verify', lamp)
        found = dict(re.findall(r'^  (type|module): (.+)$', verified.stdout, re.MULTILINE))
        if verified.returncode != 0:
            problems.append(f'lamp-module verify: {(verified.stderr or verified.stdout).strip()}')
        elif found.get('type') != kind or found.get('module') != module_id:
            problems.append(f"lamp-module verify reports type {found.get('type')!r}, "
                            f"module {found.get('module')!r}")

        failures += [f'{kind}: {p}' for p in problems]
        status = 'ok' if not problems else 'FAILED'
        print(f"  {kind:12} inspect, build, verify as {found.get('type', '?')}  {status}")


def main() -> int:
    failures = []

    for kind in CHECKS:
        check_module(kind, failures)
    check_offsets(failures)

    cli, problem = find_core_cli()
    if problem:
        failures.append(problem)
    elif cli:
        print(f'\nChecking against the apps\' own code ({cli}):')
        check_with_core(cli, failures)
    else:
        print('\nNote: lamp-module not found, so the checks against the apps\' own code were '
              'skipped. Set LAMP_CORE_CLI, or build ../lamp-bible-core.')

    if failures:
        print('\nFAILED:')
        for f in failures:
            print(f'  - {f}')
        return 1

    print(f'\nAll {len(CHECKS)} sample modules verified.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
