#!/usr/bin/env python3
"""
Checks every published sample module by doing what the app does: decompress the
raw DEFLATE stream, open the result as SQLite, and read something back out.

    python3 scripts/verify_sample_modules.py

Run this after build_sample_modules.py. It is also a short worked example of
reading a .lamp file from another language or toolchain.
"""

import sqlite3
import sys
import tempfile
import zlib
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SAMPLES = REPO / 'public/modules/samples'

# One representative query per module type, with the row count we expect.
CHECKS = {
    'translation': ('SELECT count(*) FROM verses', 6),
    'dictionary': ('SELECT count(*) FROM dictionary_entries', 3),
    'commentary': ('SELECT count(*) FROM commentary_units', 5),
    'plan': ('SELECT count(*) FROM plan_days', 7),
    'quiz': ('SELECT count(*) FROM quiz_questions', 4),
    'notes': ('SELECT count(*) FROM note_entries', 3),
    'devotional': ('SELECT count(*) FROM devotional_entries', 2),
    'highlights': ('SELECT count(*) FROM highlights', 4),
}


def read_lamp(path: Path) -> bytes:
    """Decompress a .lamp file. wbits=-15 means raw DEFLATE, no header."""
    return zlib.decompressobj(wbits=-15).decompress(path.read_bytes())


def check_offsets(failures: list) -> None:
    """
    Confirm every annotation and highlight offset lands on the text it claims.

    A wrong offset is the one error in this format that produces a perfectly
    valid file which behaves wrongly, so it is worth asserting rather than
    eyeballing.
    """
    import json

    translation = json.loads(
        (SAMPLES / 'translation/lamp-sample-translation.json').read_text()
    )
    verse_text = {}
    for book in translation['books']:
        for chapter in book['chapters']:
            for verse in chapter['verses']:
                text = verse['content']['text']
                verse_text[verse['ref']] = text
                for a in verse['content'].get('annotations', []):
                    actual = text[a['start']:a['end']]
                    if actual != a['text']:
                        failures.append(
                            f"translation {verse['ref']}: annotation says {a['text']!r} "
                            f"but offsets {a['start']}-{a['end']} cover {actual!r}"
                        )

    highlights = json.loads((SAMPLES / 'highlights/lamp-sample-highlights.json').read_text())
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

    commentary = json.loads((SAMPLES / 'commentary/lamp-sample-commentary.json').read_text())
    for book in commentary['books']:
        for unit in book['units']:
            body = unit.get('commentary')
            if not body:
                continue
            for a in body.get('annotations', []):
                actual = body['text'][a['start']:a['end']]
                if actual != a['text']:
                    failures.append(
                        f"commentary {unit['id']}: annotation says {a['text']!r} "
                        f"but offsets cover {actual!r}"
                    )


def main() -> int:
    failures = []

    for kind, (query, expected) in CHECKS.items():
        lamp = SAMPLES / kind / f'lamp-sample-{kind}.lamp'
        if not lamp.exists():
            failures.append(f'{kind}: missing {lamp.relative_to(REPO)}')
            continue

        try:
            data = read_lamp(lamp)
        except zlib.error as exc:
            failures.append(f'{kind}: not a raw DEFLATE stream ({exc})')
            continue

        if not data.startswith(b'SQLite format 3\x00'):
            failures.append(f'{kind}: decompressed payload is not a SQLite database')
            continue

        with tempfile.NamedTemporaryFile(suffix='.db') as tmp:
            tmp.write(data)
            tmp.flush()
            conn = sqlite3.connect(tmp.name)
            try:
                integrity = conn.execute('PRAGMA integrity_check').fetchone()[0]
                if integrity != 'ok':
                    failures.append(f'{kind}: integrity check said {integrity!r}')
                    continue
                count = conn.execute(query).fetchone()[0]
            except sqlite3.Error as exc:
                failures.append(f'{kind}: {exc}')
                continue
            finally:
                conn.close()

        status = 'ok' if count == expected else f'expected {expected}'
        if count != expected:
            failures.append(f'{kind}: {query} returned {count}, {status}')
        print(f'  {kind:12} {len(lamp.read_bytes()):>6,} bytes  {count} rows  {status}')

    check_offsets(failures)

    if failures:
        print('\nFAILED:')
        for f in failures:
            print(f'  - {f}')
        return 1

    print(f'\nAll {len(CHECKS)} sample modules verified.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
