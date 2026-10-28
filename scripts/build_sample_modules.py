#!/usr/bin/env python3
"""
Builds the downloadable sample modules published on the documentation site.

This script is itself the worked example: /docs/modules/building walks through
it, so the code is meant to be read. Every module type the apps support is
produced here, each from a small JSON document, with the same tables, the same
rows and the same raw-DEFLATE container that the apps' own module compiler
writes.

    python3 scripts/build_sample_modules.py

Outputs, all committed to the repo:

    public/modules/samples/<type>/<module id>.lamp   installable module
    public/modules/samples/<type>/<module id>.json   the source document
    public/modules/sqlite/<type>.sql                 the table definitions

A .lamp file must be named after the module it holds. The iPhone and iPad app
takes the module ID from the file name and rejects a file whose rows belong to
a different module.

All sample content is either public domain (CC0 BSB verse text, Strong's glosses)
or written for this purpose. Nothing here reproduces licensed material.
"""

import json
import sqlite3
import zlib
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SAMPLES = REPO / 'public/modules/samples'
SQL_DIR = REPO / 'public/modules/sqlite'

# The version of the container format recorded in every module.
FORMAT_VERSION = '1.0'


# ---------------------------------------------------------------------------
# Table definitions
#
# These are the tables the apps build and read. They are transcribed from the
# module compiler in lamp-bible-core, the Swift package every Lamp app shares
# (Sources/LampModuleKit/*ModuleCompiler.swift). When that compiler is
# available, scripts/verify_sample_modules.py compiles the same JSON with it and
# fails if its tables, columns or rows differ from the ones written here.
# ---------------------------------------------------------------------------

MODULE_FORMAT_SQL = """
-- Every module names itself and its type here. The apps read this row first;
-- without it they guess the type from the other tables, and can guess wrong.
CREATE TABLE module_format (
    format_version TEXT NOT NULL,
    module_type TEXT NOT NULL,
    module_id TEXT NOT NULL
);
"""

TRANSLATION_SQL = MODULE_FORMAT_SQL + """
CREATE TABLE translation_meta (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    abbreviation TEXT NOT NULL,
    description TEXT,
    language TEXT NOT NULL,
    language_name TEXT,
    text_direction TEXT NOT NULL DEFAULT 'ltr',
    translation_philosophy TEXT,
    year INTEGER,
    publisher TEXT,
    copyright TEXT,
    copyright_year INTEGER,
    license TEXT,
    source_texts_json TEXT,
    features_json TEXT,
    versification TEXT DEFAULT 'standard'
);

CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    book_id TEXT NOT NULL,
    name TEXT NOT NULL,
    testament TEXT NOT NULL,
    chapter_count INTEGER NOT NULL
);

CREATE TABLE verses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref INTEGER NOT NULL UNIQUE,
    book INTEGER NOT NULL,
    chapter INTEGER NOT NULL,
    verse INTEGER NOT NULL,
    text TEXT NOT NULL,
    annotations_json TEXT,
    footnotes_json TEXT,
    footnote_refs_json TEXT,
    paragraph INTEGER DEFAULT 0,
    poetry_json TEXT
);
CREATE INDEX idx_verses_ref ON verses(ref);
CREATE INDEX idx_verses_book_chapter ON verses(book, chapter);

CREATE TABLE headings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book INTEGER NOT NULL,
    chapter INTEGER NOT NULL,
    before_verse INTEGER NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    text TEXT NOT NULL
);
CREATE INDEX idx_headings_chapter ON headings(book, chapter);

CREATE VIRTUAL TABLE verses_fts USING fts5(
    text,
    content='verses',
    content_rowid='id',
    tokenize='unicode61 remove_diacritics 2'
);

CREATE TRIGGER verses_fts_insert AFTER INSERT ON verses BEGIN
    INSERT INTO verses_fts(rowid, text) VALUES (new.id, new.text);
END;
"""

DICTIONARY_SQL = MODULE_FORMAT_SQL + """
CREATE TABLE module_metadata (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    author TEXT,
    version TEXT,
    key_type TEXT,
    schema_version TEXT,
    type TEXT,
    series_abbrev TEXT,
    series_full TEXT,
    editor TEXT,
    publisher TEXT,
    year INTEGER,
    isbn TEXT,
    language TEXT
);

CREATE TABLE dictionary_entries (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL,
    key TEXT NOT NULL,
    lemma TEXT NOT NULL,
    transliteration TEXT,
    pronunciation TEXT,
    senses_json TEXT,
    metadata_json TEXT,
    search_text TEXT
);
CREATE INDEX idx_dict_module ON dictionary_entries(module_id);
CREATE INDEX idx_dict_key ON dictionary_entries(key);
CREATE INDEX idx_dict_lemma ON dictionary_entries(lemma);
"""

# A commentary module is one book of a series. It has no metadata table of its
# own: the series names and the volume title live on its commentary_books row.
COMMENTARY_SQL = MODULE_FORMAT_SQL + """
CREATE TABLE commentary_books (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL,
    book_number INTEGER NOT NULL,
    series_full TEXT,
    series_abbrev TEXT,
    title TEXT,
    author TEXT,
    editor TEXT,
    publisher TEXT,
    year INTEGER,
    abbreviations_json TEXT,
    front_matter_json TEXT,
    indices_json TEXT
);
CREATE INDEX idx_comm_books_module ON commentary_books(module_id);
CREATE INDEX idx_comm_books_book ON commentary_books(book_number);

CREATE TABLE commentary_units (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL,
    book INTEGER NOT NULL,
    chapter INTEGER,
    sv INTEGER NOT NULL,
    ev INTEGER,
    unit_type TEXT NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    parent_id TEXT,
    title TEXT,
    suffix TEXT,
    introduction_json TEXT,
    translation_json TEXT,
    commentary_json TEXT,
    footnotes_json TEXT,
    search_text TEXT NOT NULL DEFAULT '',
    order_index INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_comm_units_module ON commentary_units(module_id);
CREATE INDEX idx_comm_units_verse ON commentary_units(sv, ev);
CREATE INDEX idx_comm_units_book_chapter ON commentary_units(book, chapter);
CREATE INDEX idx_comm_units_parent ON commentary_units(parent_id);
CREATE INDEX idx_comm_units_type ON commentary_units(unit_type);
"""

BOOK_SQL = MODULE_FORMAT_SQL + """
CREATE TABLE book_modules (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    author TEXT,
    editor TEXT,
    publisher TEXT,
    year INTEGER,
    edition TEXT,
    isbn TEXT,
    language TEXT NOT NULL,
    text_direction TEXT NOT NULL DEFAULT 'ltr',
    copyright TEXT,
    license TEXT,
    version TEXT,
    schema_version TEXT NOT NULL,
    tags_json TEXT,
    cover_media_id TEXT,
    is_editable INTEGER NOT NULL DEFAULT 0,
    created INTEGER,
    last_modified INTEGER,
    footnotes_json TEXT,
    media_json TEXT
);

CREATE TABLE book_sections (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL REFERENCES book_modules(id) ON DELETE CASCADE,
    section_id TEXT NOT NULL,
    parent_id TEXT REFERENCES book_sections(id) ON DELETE CASCADE,
    section_type TEXT NOT NULL,
    number TEXT,
    title TEXT NOT NULL,
    subtitle TEXT,
    depth INTEGER NOT NULL,
    order_index INTEGER NOT NULL,
    key_scriptures_json TEXT,
    content_json TEXT NOT NULL,
    search_text TEXT NOT NULL DEFAULT '',
    UNIQUE(module_id, section_id)
);
CREATE INDEX idx_book_sections_module ON book_sections(module_id);
CREATE INDEX idx_book_sections_parent ON book_sections(parent_id, order_index);
CREATE INDEX idx_book_sections_type ON book_sections(module_id, section_type);

CREATE VIRTUAL TABLE book_sections_fts USING fts5(
    title,
    search_text,
    content='book_sections',
    content_rowid='rowid'
);
"""

# Notes and devotionals, the two kinds of module you write in the app, share
# this small metadata table.
MODULE_META_SQL = """
CREATE TABLE module_meta (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    author TEXT,
    version TEXT,
    is_editable INTEGER NOT NULL DEFAULT 1
);
"""

NOTES_SQL = MODULE_FORMAT_SQL + MODULE_META_SQL + """
CREATE TABLE note_book_meta (
    module_id TEXT PRIMARY KEY REFERENCES module_meta(id) ON DELETE CASCADE,
    book TEXT NOT NULL,
    book_number INTEGER NOT NULL,
    media_json TEXT
);

CREATE TABLE note_entries (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL,
    verse_id INTEGER NOT NULL,
    book INTEGER NOT NULL,
    chapter INTEGER NOT NULL,
    verse INTEGER NOT NULL,
    title TEXT,
    content TEXT NOT NULL,
    verse_refs_json TEXT,
    last_modified INTEGER,
    footnotes_json TEXT,
    search_text TEXT,
    record_change_tag TEXT
);
CREATE INDEX idx_note_module ON note_entries(module_id);
CREATE INDEX idx_note_verse ON note_entries(verse_id);
CREATE INDEX idx_note_chapter ON note_entries(book, chapter, verse);

CREATE VIRTUAL TABLE note_fts USING fts5(
    title, search_text,
    content='note_entries', content_rowid='rowid'
);
"""

DEVOTIONAL_SQL = MODULE_FORMAT_SQL + MODULE_META_SQL + """
CREATE TABLE devotional_entries (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL REFERENCES module_meta(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    subtitle TEXT,
    author TEXT,
    date TEXT,
    tags TEXT,
    category TEXT,
    series_id TEXT,
    series_name TEXT,
    series_order INTEGER,
    key_scriptures_json TEXT,
    summary_json TEXT,
    content_json TEXT NOT NULL,
    footnotes_json TEXT,
    related_ids TEXT,
    created INTEGER NOT NULL,
    last_modified INTEGER,
    search_text TEXT,
    record_change_tag TEXT,
    subscription_id TEXT,
    is_read_only INTEGER,
    media_json TEXT
);
CREATE INDEX idx_dev_module ON devotional_entries(module_id);
CREATE INDEX idx_dev_date ON devotional_entries(date);
CREATE INDEX idx_dev_series ON devotional_entries(series_id, series_order);
"""

HIGHLIGHTS_SQL = MODULE_FORMAT_SQL + """
CREATE TABLE highlight_meta (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    translation_id TEXT NOT NULL,
    created INTEGER,
    last_modified INTEGER
);

CREATE TABLE highlights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref INTEGER NOT NULL,
    sc INTEGER NOT NULL,
    ec INTEGER NOT NULL,
    style INTEGER NOT NULL DEFAULT 0,
    color TEXT
);
CREATE INDEX idx_highlights_ref ON highlights(ref, sc);

CREATE TABLE highlight_themes (
    color TEXT NOT NULL,
    style INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    PRIMARY KEY (color, style)
);
"""

PLAN_SQL = MODULE_FORMAT_SQL + """
CREATE TABLE plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    author TEXT,
    full_description TEXT,
    duration INTEGER NOT NULL,
    readings_per_day INTEGER
);

CREATE TABLE plan_days (
    plan_id TEXT NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
    day INTEGER NOT NULL,
    readings_json TEXT NOT NULL,
    PRIMARY KEY (plan_id, day)
);
CREATE INDEX idx_plan_days_plan ON plan_days(plan_id, day);
"""

QUIZ_SQL = MODULE_FORMAT_SQL + """
CREATE TABLE quiz_modules (
    id TEXT PRIMARY KEY,
    plan_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    questions_per_reading INTEGER,
    age_groups_json TEXT NOT NULL
);

CREATE TABLE quiz_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_module_id TEXT NOT NULL REFERENCES quiz_modules(id) ON DELETE CASCADE,
    day INTEGER NOT NULL,
    sv INTEGER NOT NULL,
    ev INTEGER NOT NULL,
    age_group TEXT NOT NULL,
    question_index INTEGER NOT NULL,
    question_json TEXT NOT NULL,
    answer_json TEXT NOT NULL,
    theme TEXT NOT NULL,
    christ_focused INTEGER NOT NULL DEFAULT 0,
    references_json TEXT,
    cross_references_json TEXT,
    UNIQUE(quiz_module_id, day, sv, ev, age_group, question_index)
);
CREATE INDEX idx_quiz_questions_module_day ON quiz_questions(quiz_module_id, day);
CREATE INDEX idx_quiz_questions_module_age ON quiz_questions(quiz_module_id, age_group);
CREATE INDEX idx_quiz_questions_reading
    ON quiz_questions(quiz_module_id, day, sv, ev, age_group);
"""


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def ref(book: int, chapter: int, verse: int) -> int:
    """Encode a verse reference as BBCCCVVV."""
    return book * 1_000_000 + chapter * 1_000 + verse


def span(text: str, phrase: str, occurrence: int = 0) -> tuple:
    """
    Locate a phrase in text and return its (start, end) character offsets,
    with start inclusive and end exclusive.

    Offsets are the single easiest thing to get wrong when hand-authoring a
    module, and a wrong offset silently annotates or highlights the wrong
    words. Deriving them from the text removes the whole class of mistake.
    """
    start = -1
    for _ in range(occurrence + 1):
        start = text.find(phrase, start + 1)
        if start == -1:
            raise ValueError(f'{phrase!r} occurrence {occurrence} not found in {text!r}')
    return start, start + len(phrase)


def annotate(text: str, marks: list) -> list:
    """
    Build an annotation list from (type, phrase, data) tuples, or
    (type, phrase, data, occurrence) where the phrase repeats.
    """
    annotations = []
    for mark in marks:
        kind, phrase, data = mark[0], mark[1], mark[2]
        occurrence = mark[3] if len(mark) > 3 else 0
        start, end = span(text, phrase, occurrence)
        annotations.append(
            {'type': kind, 'start': start, 'end': end, 'text': phrase, 'data': data}
        )
    return annotations


def footnote_after(text: str, phrase: str, footnote_id: str) -> dict:
    """Place a footnote marker straight after a phrase."""
    return {'id': footnote_id, 'offset': span(text, phrase)[1]}


def highlight(text: str, phrase: str, style: int, color: str, occurrence: int = 0) -> dict:
    """Build a highlight span from the phrase it should cover."""
    start, end = span(text, phrase, occurrence)
    return {'sc': start, 'ec': end, 'style': style, 'color': color}


def to_json(value):
    """
    Serialise a structured field the way the apps' compiler does: keys sorted,
    no whitespace, and an empty value stored as NULL rather than "" or "[]".
    """
    if value is None or value == '' or value == [] or value == {}:
        return None
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':'))


# Keys whose values hold readable text, in the order the compiler visits them.
TEXT_KEYS = ('title', 'content', 'children', 'introduction', 'sections', 'blocks',
             'subsections', 'conclusion', 'caption', 'items', 'tableData', 'headers', 'rows')


def plain_text(value) -> str:
    """
    Flatten a string, annotated text or block structure to plain text for
    searching. An annotated-text object contributes its text and nothing else.
    """
    if isinstance(value, str):
        return value
    if isinstance(value, list):
        return ' '.join(part for part in map(plain_text, value) if part)
    if isinstance(value, dict):
        if isinstance(value.get('text'), str):
            return value['text']
        return ' '.join(part for part in (plain_text(value[k]) for k in TEXT_KEYS if k in value)
                        if part)
    return ''


def joined(*parts) -> str:
    """Join the non-empty parts of a search_text column with spaces."""
    return ' '.join(p for p in parts if p)


def write_lamp(db_path: Path) -> Path:
    """
    Compress a SQLite database into a .lamp file with raw DEFLATE.

    wbits=-15 selects raw DEFLATE with no zlib or gzip header, which is what
    the apps' decompressor expects. The round trip is verified before the
    original is discarded.
    """
    data = db_path.read_bytes()
    compressor = zlib.compressobj(level=9, wbits=-15)
    compressed = compressor.compress(data) + compressor.flush()

    if zlib.decompressobj(wbits=-15).decompress(compressed) != data:
        raise RuntimeError(f'compression round trip failed for {db_path}')

    lamp_path = db_path.with_suffix('.lamp')
    lamp_path.write_bytes(compressed)
    db_path.unlink()

    saved = (1 - len(compressed) / len(data)) * 100
    print(f'  {lamp_path.name}: {len(data):,} -> {len(compressed):,} bytes ({saved:.0f}% smaller)')
    return lamp_path


def build(kind: str, ddl: str, source: dict, populate) -> None:
    """Write the source JSON, the DDL, and the compiled .lamp for one module."""
    module_id = source['meta']['id']
    out_dir = SAMPLES / kind
    out_dir.mkdir(parents=True, exist_ok=True)
    SQL_DIR.mkdir(parents=True, exist_ok=True)

    # Clear out files from an earlier build under another name.
    for stale in out_dir.iterdir():
        if stale.suffix in ('.json', '.lamp', '.db') and stale.stem != module_id:
            stale.unlink()

    # The file name is the module ID. That is what the apps check it against.
    (out_dir / f'{module_id}.json').write_text(
        json.dumps(source, indent=2, ensure_ascii=False) + '\n'
    )
    (SQL_DIR / f'{kind}.sql').write_text(ddl.strip() + '\n')

    db_path = out_dir / f'{module_id}.db'
    if db_path.exists():
        db_path.unlink()

    conn = sqlite3.connect(db_path)
    conn.execute('PRAGMA foreign_keys = ON')
    conn.executescript(ddl)
    cur = conn.cursor()
    cur.execute(
        'INSERT INTO module_format (format_version, module_type, module_id) VALUES (?, ?, ?)',
        (FORMAT_VERSION, kind, module_id),
    )
    populate(cur, source)
    conn.commit()
    conn.close()

    write_lamp(db_path)


# ---------------------------------------------------------------------------
# Sample source documents
#
# Verse text is the Berean Standard Bible (CC0 1.0). Commentary, notes,
# devotional, book and quiz content is original, written for these samples.
#
# Each populate_* function turns one document into rows, field for field as
# the apps' compiler does, so that a module built here and one built by the
# apps from the same JSON hold the same data.
# ---------------------------------------------------------------------------

# Verse text, named so that annotations and highlights can be positioned by
# phrase rather than by hand-counted offset.
GEN_1_1 = 'In the beginning God created the heavens and the earth.'
GEN_1_2 = ('Now the earth was formless and void, and darkness was over the surface of the deep. '
           'And the Spirit of God was hovering over the surface of the waters.')
GEN_1_3 = 'And God said, “Let there be light,” and there was light.'
JOHN_1_1 = ('In the beginning was the Word, and the Word was with God, and the Word '
            'was God.')
JOHN_1_14 = ('The Word became flesh and made His dwelling among us. We have seen His glory, the '
             'glory of the one and only Son from the Father, full of grace and truth.')
PSALM_119_105 = 'Your word is a lamp to my feet and a light to my path.'


# --- Translation -----------------------------------------------------------

TRANSLATION = {
    'meta': {
        'schemaVersion': '1.0',
        'id': 'SAMPLEs',
        'type': 'translation',
        'name': 'Lamp Sample Translation',
        'abbreviation': 'SAMPLE',
        'description': 'Six Berean Standard Bible verses demonstrating the translation schema.',
        'language': 'en',
        'languageName': 'English',
        'textDirection': 'ltr',
        'translationPhilosophy': 'formal',
        'publisher': 'Berean Bible',
        'copyright': 'Dedicated to the public domain under CC0 1.0.',
        'license': 'CC0 1.0',
        'versification': 'standard',
        'features': {'strongs': True, 'morphology': False, 'redLetter': True, 'footnotes': True},
    },
    'books': [
        {
            'id': 'Gen',
            'name': 'Genesis',
            'number': 1,
            'testament': 'OT',
            'chapters': [
                {
                    'chapter': 1,
                    'headings': [{'text': 'The Creation', 'beforeVerse': 1, 'level': 1}],
                    'verses': [
                        {
                            'v': 1,
                            'ref': 1001001,
                            'paragraph': True,
                            'content': {
                                'text': GEN_1_1,
                                'annotations': annotate(GEN_1_1, [
                                    ('strongs', 'beginning', {'strongs': 'H7225'}),
                                    ('strongs', 'God', {'strongs': 'H430', 'lemma': 'אֱלֹהִים'}),
                                    ('strongs', 'created', {'strongs': 'H1254'}),
                                ]),
                                # Where the footnote marker sits in the verse.
                                'footnote_refs': [footnote_after(GEN_1_1, 'created', '1')],
                            },
                            'footnotes': [
                                {'id': '1', 'content': {
                                    'text': 'Hebrew bara, used only of divine creating.'}},
                            ],
                        },
                        {
                            'v': 2,
                            'ref': 1001002,
                            'content': {'text': GEN_1_2, 'annotations': []},
                        },
                        {
                            'v': 3,
                            'ref': 1001003,
                            'content': {
                                'text': GEN_1_3,
                                'annotations': annotate(GEN_1_3, [
                                    ('strongs', 'God', {'strongs': 'H430'}),
                                ]),
                            },
                        },
                    ],
                }
            ],
        },
        {
            'id': 'John',
            'name': 'John',
            'number': 43,
            'testament': 'NT',
            'chapters': [
                {
                    'chapter': 1,
                    'headings': [{'text': 'The Word Made Flesh', 'beforeVerse': 1, 'level': 1}],
                    'verses': [
                        {
                            'v': 1,
                            'ref': 43001001,
                            'paragraph': True,
                            'content': {
                                'text': JOHN_1_1,
                                # The third occurrence of "Word" and the second "God" are
                                # the ones the prologue's final clause turns on.
                                'annotations': annotate(JOHN_1_1, [
                                    ('strongs', 'Word', {'strongs': 'G3056', 'lemma': 'λόγος'}),
                                    ('strongs', 'God', {'strongs': 'G2316'}),
                                    ('strongs', 'God', {'strongs': 'G2316'}, 1),
                                ]),
                            },
                        },
                        {
                            'v': 14,
                            'ref': 43001014,
                            'content': {
                                'text': JOHN_1_14,
                                'annotations': annotate(JOHN_1_14, [
                                    ('strongs', 'Word', {'strongs': 'G3056'}),
                                ]),
                            },
                        },
                    ],
                }
            ],
        },
        {
            'id': 'Ps',
            'name': 'Psalms',
            'number': 19,
            'testament': 'OT',
            'chapters': [
                {
                    'chapter': 119,
                    'headings': [],
                    'verses': [
                        {
                            'v': 105,
                            'ref': 19119105,
                            'poetry': {'indent': 1},
                            'content': {
                                'text': PSALM_119_105,
                                'annotations': annotate(PSALM_119_105, [
                                    ('strongs', 'lamp', {'strongs': 'H5216'}),
                                ]),
                            },
                        }
                    ],
                }
            ],
        },
    ],
}


def populate_translation(cur, src):
    meta = src['meta']
    cur.execute(
        """INSERT INTO translation_meta (
               id, name, abbreviation, description, language, language_name,
               text_direction, translation_philosophy, year, publisher, copyright,
               copyright_year, license, source_texts_json, features_json, versification
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (meta['id'], meta['name'], meta['abbreviation'], meta.get('description'),
         meta['language'], meta.get('languageName'), meta.get('textDirection') or 'ltr',
         meta.get('translationPhilosophy'), meta.get('year'), meta.get('publisher'),
         meta.get('copyright'), meta.get('copyrightYear'), meta.get('license'),
         to_json(meta.get('sourceTexts')), to_json(meta.get('features')),
         meta.get('versification') or 'standard'),
    )

    for book in src['books']:
        # chapter_count is the number of chapters this module carries.
        cur.execute(
            'INSERT INTO books (id, book_id, name, testament, chapter_count) VALUES (?, ?, ?, ?, ?)',
            (book['number'], book['id'], book['name'], book['testament'], len(book['chapters'])),
        )
        for chapter in book['chapters']:
            for heading in chapter.get('headings', []):
                cur.execute(
                    """INSERT INTO headings (book, chapter, before_verse, level, text)
                       VALUES (?, ?, ?, ?, ?)""",
                    (book['number'], chapter['chapter'], heading['beforeVerse'],
                     heading.get('level', 1), heading['text']),
                )
            for verse in chapter['verses']:
                content = verse['content']
                if isinstance(content, str):
                    content = {'text': content}
                cur.execute(
                    """INSERT INTO verses (
                           ref, book, chapter, verse, text, annotations_json,
                           footnotes_json, footnote_refs_json, paragraph, poetry_json
                       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (verse.get('ref', ref(book['number'], chapter['chapter'], verse['v'])),
                     book['number'], chapter['chapter'], verse['v'], content['text'],
                     to_json(content.get('annotations')),
                     to_json(verse.get('footnotes')),
                     to_json(content.get('footnote_refs')),
                     1 if verse.get('paragraph') else 0,
                     to_json(verse.get('poetry'))),
                )

    # The insert trigger has already indexed each verse; rebuilding the
    # full-text index once at the end guarantees it, however rows arrived.
    cur.execute("INSERT INTO verses_fts(verses_fts) VALUES('rebuild')")


# --- Dictionary ------------------------------------------------------------

DICTIONARY = {
    'meta': {
        'schemaVersion': '2.1',
        'id': 'sample-lexicon',
        'type': 'dictionary',
        'name': 'Lamp Sample Lexicon',
        'description': 'Three public-domain Strong\'s entries demonstrating the lexicon schema.',
        'author': 'Public Domain',
        'version': '1.0.0',
        'keyType': 'strongs',
        'language': 'en',
    },
    'entries': [
        {
            'key': 'H430',
            'lemma': 'אֱלֹהִים',
            'transliteration': 'elohiym',
            'pronunciation': 'el-o-heem',
            'senses': [
                {'id': 1, 'partOfSpeech': 'noun masculine plural', 'gloss': 'God',
                 'definition': 'God, the supreme God of Israel.'},
                {'id': 2, 'partOfSpeech': 'noun masculine plural', 'gloss': 'gods',
                 'definition': 'gods, in the plural, of the gods of the nations.'},
            ],
        },
        {
            'key': 'G3056',
            'lemma': 'λόγος',
            'transliteration': 'logos',
            'pronunciation': 'log-os',
            'senses': [
                {'id': 1, 'partOfSpeech': 'noun masculine', 'gloss': 'word, account, reason',
                 'definition': 'a word, spoken or written; the expression of a thought.'},
                {'id': 2, 'partOfSpeech': 'noun masculine', 'gloss': 'the Word',
                 'definition': 'the divine Word, used of Christ in John 1.',
                 'references': [{'sv': 43001001}]},
            ],
        },
        {
            'key': 'H5216',
            'lemma': 'נִיר',
            'transliteration': 'niyr',
            'pronunciation': 'neer',
            'senses': [
                {'id': 1, 'partOfSpeech': 'noun masculine', 'gloss': 'lamp, light',
                 'definition': 'a lamp; figuratively, the light of life or guidance.',
                 'references': [{'sv': 19119105}]},
            ],
        },
    ],
}

# The fields a sense may carry. Anything else on an entry is kept, as a JSON
# object, in metadata_json.
SENSE_FIELDS = ('definition', 'shortDefinition', 'partOfSpeech', 'usage', 'derivation',
                'gloss', 'references', 'translationUsages')
ENTRY_FIELDS = ('key', 'lemma', 'transliteration', 'pronunciation', 'senses') + SENSE_FIELDS


def stored_sense(sense: dict) -> dict:
    """A sense as senses_json holds it: the known fields, with the number as a string."""
    stored = {k: sense[k] for k in SENSE_FIELDS if k in sense}
    if 'id' in sense:
        stored['id'] = str(sense['id'])
    return stored


def populate_dictionary(cur, src):
    meta = src['meta']
    cur.execute(
        """INSERT INTO module_metadata (
               id, name, description, author, version, key_type, schema_version, type,
               series_abbrev, series_full, editor, publisher, year, isbn, language
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (meta['id'], meta['name'], meta.get('description'), meta.get('author'),
         meta.get('version'), meta.get('keyType'), meta.get('schemaVersion'), meta.get('type'),
         meta.get('seriesAbbrev'), meta.get('seriesFull'), meta.get('editor'),
         meta.get('publisher'), meta.get('year'), meta.get('isbn'), meta.get('language')),
    )
    for entry in src['entries']:
        senses = [stored_sense(s) for s in entry.get('senses', [])]
        extra = {k: v for k, v in entry.items() if k not in ENTRY_FIELDS}
        search_text = joined(*(
            part for s in senses
            for part in (plain_text(s.get('definition')), plain_text(s.get('shortDefinition')),
                         s.get('gloss'))
        ))
        cur.execute(
            """INSERT INTO dictionary_entries (
                   id, module_id, key, lemma, transliteration, pronunciation,
                   senses_json, metadata_json, search_text
               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (f"{meta['id']}:{entry['key']}", meta['id'], entry['key'], entry.get('lemma', ''),
             entry.get('transliteration'), entry.get('pronunciation'),
             to_json(senses), to_json(extra), search_text),
        )


# --- Commentary ------------------------------------------------------------

GEN_INTRO = ('The first three verses establish who acts, what is made, and by what means. '
             'John 1:1 opens with the same three words on purpose.')
GEN_NOTE = ('The verb translated created is reserved in Hebrew for divine activity. It is '
            'never used with a human subject, which is the first thing the sentence tells '
            'us about its subject.')

# One commentary file covers one book. The series it belongs to is named in
# the metadata; the title is this volume's.
COMMENTARY = {
    'meta': {
        'schemaVersion': '2.2',
        'id': 'sample-commentary',
        'type': 'commentary',
        'name': 'Lamp Sample Commentary',
        'title': 'Lamp Sample Commentary on Genesis',
        'description': 'Original notes on the opening of Genesis, showing the '
                       'section, pericope and verse nesting.',
        'author': 'Lamp Bible',
        'seriesAbbrev': 'LSC',
        'seriesFull': 'Lamp Sample Commentary',
        'language': 'en',
    },
    'book': 'Gen',
    'bookNumber': 1,
    'chapters': [
        {
            'chapter': 1,
            'sections': [
                {
                    'id': 'gen-1-1-3',
                    'title': 'The Opening of the Account',
                    'sv': 1001001,
                    'ev': 1001003,
                    'introduction': {
                        'text': GEN_INTRO,
                        'annotations': annotate(GEN_INTRO, [
                            ('scripture', 'John 1:1', {'sv': 43001001}),
                        ]),
                    },
                    'pericopae': [
                        {
                            'id': '1:1',
                            'title': 'In the beginning',
                            'sv': 1001001,
                            'ev': 1001001,
                            'verses': [
                                {
                                    'sv': 1001001,
                                    'commentary': {
                                        'text': GEN_NOTE,
                                        'annotations': annotate(GEN_NOTE, [
                                            ('strongs', 'created', {'strongs': 'H1254'}),
                                        ]),
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}


def commentary_units(module_id: str, book: int, chapters: list, footnotes: list) -> list:
    """
    Flatten chapters -> sections -> pericopae -> verses into commentary_units
    rows, in reading order. order_index is the row's position in that order,
    and appears in the unit's ID.

    Schema 2.2 also lets a pericope carry source-ordered `content` blocks in
    place of verses; the apps turn each block into a unit of its own. This
    sample uses the classic structure, so that form is not handled here.
    """
    rows = []
    notes_by_id = {note['id']: note for note in footnotes}

    def add(unit_id, unit_type, chapter, sv, ev=None, level=1, parent=None, title=None,
            suffix=None, introduction=None, translation=None, commentary=None, notes=None):
        rows.append({
            'id': unit_id, 'chapter': chapter, 'sv': sv, 'ev': ev, 'unit_type': unit_type,
            'level': level, 'parent_id': parent, 'title': title, 'suffix': suffix,
            'introduction_json': to_json(introduction),
            'translation_json': to_json(translation),
            'commentary_json': to_json(commentary),
            'footnotes_json': to_json(notes),
            'search_text': joined(plain_text(title), plain_text(introduction),
                                  plain_text(translation), plain_text(commentary)),
            'order_index': len(rows),
        })
        return unit_id

    def first_verse(chapter):
        return ref(book, chapter, 1)

    def verse(v, chapter, parent, inherited_notes):
        suffix = v.get('suffix', '')
        add(f'{module_id}:{book}:verse:{chapter}:{len(rows)}:{v["sv"]}{suffix}', 'verse',
            chapter, v['sv'], v.get('ev'), parent=parent, suffix=suffix or None,
            translation=v.get('translation'), commentary=v.get('commentary'),
            notes=v.get('footnotes') or inherited_notes)

    def pericope(p, chapter, parent):
        if 'content' in p:
            raise NotImplementedError('source-ordered content blocks are not handled here')
        # A pericope's own footnotes, or the book-wide ones it names.
        notes = p.get('footnotes') or [notes_by_id[i] for i in p.get('footnoteIds', [])
                                       if i in notes_by_id]
        unit = add(f'{module_id}:{book}:pericope:{chapter}:{len(rows)}', 'pericope', chapter,
                   p.get('sv', first_verse(chapter)), p.get('ev'), parent=parent,
                   title=p.get('title'), introduction=p.get('introduction'),
                   translation=p.get('translation'), notes=notes)
        for v in p.get('verses', []):
            verse(v, chapter, unit, notes)

    def section(s, chapter, parent, level):
        unit = add(f'{module_id}:{book}:section:{chapter}:{len(rows)}', 'section', chapter,
                   s.get('sv', first_verse(chapter)), s.get('ev'), level=level, parent=parent,
                   title=s.get('title'), introduction=s.get('introduction'))
        for sub in s.get('subsections', []):
            section(sub, chapter, unit, level + 1)
        for p in s.get('pericopae', []):
            pericope(p, chapter, unit)

    for c in chapters:
        n = c['chapter']
        if c.get('introduction'):
            # A chapter introduction is a level-0 section.
            add(f'{module_id}:{book}:chapter_intro:{n}', 'section', n, first_verse(n), level=0,
                title=f'Chapter {n} Introduction', introduction=c['introduction'])
        for s in c.get('sections', []):
            section(s, n, None, 1)
        for p in c.get('pericopae', []):
            pericope(p, n, None)
        for v in c.get('verses', []):
            verse(v, n, None, c.get('footnotes'))
    return rows


def populate_commentary(cur, src):
    meta = src['meta']
    book = src['bookNumber']
    cur.execute(
        """INSERT INTO commentary_books (
               id, module_id, book_number, series_full, series_abbrev, title, author,
               editor, publisher, year, abbreviations_json, front_matter_json, indices_json
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (f"{meta['id']}:{book}", meta['id'], book, meta.get('seriesFull'),
         meta.get('seriesAbbrev'), meta.get('title') or meta.get('name'), meta.get('author'),
         meta.get('editor'), meta.get('publisher'), meta.get('year'),
         to_json(src.get('abbreviations')), to_json(src.get('frontMatter')),
         to_json(src.get('indices'))),
    )
    for unit in commentary_units(meta['id'], book, src['chapters'], src.get('footnotes', [])):
        cur.execute(
            """INSERT INTO commentary_units (
                   id, module_id, book, chapter, sv, ev, unit_type, level, parent_id, title,
                   suffix, introduction_json, translation_json, commentary_json,
                   footnotes_json, search_text, order_index
               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (unit['id'], meta['id'], book, unit['chapter'], unit['sv'], unit['ev'],
             unit['unit_type'], unit['level'], unit['parent_id'], unit['title'], unit['suffix'],
             unit['introduction_json'], unit['translation_json'], unit['commentary_json'],
             unit['footnotes_json'], unit['search_text'], unit['order_index']),
        )


# --- Book ------------------------------------------------------------------

BOOK_PREFACE = ('This is a sample book: a preface, one chapter, and a section inside that '
                'chapter. It is small enough to read in a minute and shaped like a much '
                'longer book.')
BOOK_CHAPTER = ('The first words God speaks in Scripture call for light, and they come before '
                'there is any sun to give it. Genesis 1:3 makes light depend on the word of '
                'God, not on the lamps that will later carry it.')
BOOK_SECTION = ('John tells the story in the same order. In John 1:4 the Word is the source of '
                'life, and that life is the light of men: the light of Genesis turns out to '
                'have a name.')
BOOK_FOOTNOTE = 'The sun, moon and stars are not made until the fourth day, Genesis 1:14-19.'

BOOK = {
    'meta': {
        'schemaVersion': '1.0',
        'id': 'sample-book',
        'type': 'book',
        'title': 'Let There Be Light',
        'subtitle': 'A Lamp Bible sample book',
        'description': 'A preface, a chapter and a section, with a footnote and scripture '
                       'references, demonstrating the book schema.',
        'author': 'Lamp Bible',
        'language': 'en',
        'textDirection': 'ltr',
        'version': '1.0.0',
        'tags': ['sample'],
        'created': 1_770_000_000,
        'lastModified': 1_770_000_000,
    },
    'sections': [
        {
            'id': 'preface',
            'type': 'front-matter',
            'title': 'Preface',
            'content': [
                {'type': 'paragraph', 'content': {'text': BOOK_PREFACE}},
            ],
        },
        {
            'id': 'the-first-word',
            'type': 'chapter',
            'number': 1,
            'title': 'The First Word',
            'keyScriptures': [{'sv': 1001003, 'label': 'Genesis 1:3'}],
            'content': [
                {'type': 'blockquote', 'content': {'text': GEN_1_3}},
                {
                    'type': 'paragraph',
                    'content': {
                        'text': BOOK_CHAPTER,
                        'annotations': annotate(BOOK_CHAPTER, [
                            ('scripture', 'Genesis 1:3', {'sv': 1001003}),
                        ]),
                        'footnote_refs': [footnote_after(BOOK_CHAPTER, 'sun to give it', '1')],
                    },
                },
            ],
            'sections': [
                {
                    'id': 'light-and-life',
                    'type': 'section',
                    'title': 'Light and Life',
                    'content': [
                        {
                            'type': 'paragraph',
                            'content': {
                                'text': BOOK_SECTION,
                                'annotations': annotate(BOOK_SECTION, [
                                    ('scripture', 'John 1:4', {'sv': 43001004}),
                                ]),
                            },
                        },
                    ],
                },
            ],
        },
    ],
    # Footnotes belong to the whole book; any section's text can point at them.
    'footnotes': [
        {
            'id': '1',
            'content': {
                'text': BOOK_FOOTNOTE,
                'annotations': annotate(BOOK_FOOTNOTE, [
                    ('scripture', 'Genesis 1:14-19', {'sv': 1001014, 'ev': 1001019}),
                ]),
            },
        },
    ],
}


def populate_book(cur, src):
    meta = src['meta']
    module_id = meta['id']
    cur.execute(
        """INSERT INTO book_modules (
               id, title, subtitle, description, author, editor, publisher, year, edition,
               isbn, language, text_direction, copyright, license, version, schema_version,
               tags_json, cover_media_id, is_editable, created, last_modified,
               footnotes_json, media_json
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (module_id, meta['title'], meta.get('subtitle'), meta.get('description'),
         meta.get('author'), meta.get('editor'), meta.get('publisher'), meta.get('year'),
         meta.get('edition'), meta.get('isbn'), meta['language'],
         meta.get('textDirection') or 'ltr', meta.get('copyright'), meta.get('license'),
         meta.get('version'), meta.get('schemaVersion') or '1.0', to_json(meta.get('tags')),
         meta.get('coverMediaId'), 1 if meta.get('isEditable') else 0, meta.get('created'),
         meta.get('lastModified'), to_json(src.get('footnotes')), to_json(src.get('media'))),
    )

    def insert(sections, parent, depth):
        for index, section in enumerate(sections):
            # Section IDs are unique within the book; the row ID adds the module's.
            row_id = f"{module_id}:{section['id']}"
            content = section.get('content', [])
            number = section.get('number')
            cur.execute(
                """INSERT INTO book_sections (
                       id, module_id, section_id, parent_id, section_type, number, title,
                       subtitle, depth, order_index, key_scriptures_json, content_json,
                       search_text
                   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (row_id, module_id, section['id'], parent, section['type'],
                 None if number is None else str(number), section['title'],
                 section.get('subtitle'), depth, section.get('order', index),
                 to_json(section.get('keyScriptures')), to_json(content) or '[]',
                 joined(section['title'], section.get('subtitle'), plain_text(content))),
            )
            insert(section.get('sections', []), row_id, depth + 1)

    insert(src['sections'], None, 0)
    cur.execute("INSERT INTO book_sections_fts(book_sections_fts) VALUES('rebuild')")


# --- Reading plan ----------------------------------------------------------

PLAN = {
    'meta': {
        'schemaVersion': '1.0',
        'id': 'sample-plan',
        'type': 'plan',
        'name': 'Lamp Sample Plan',
        'description': 'A seven day walk through the opening of Scripture.',
        'author': 'Lamp Bible',
        'fullDescription': 'A short demonstration plan: one reading a day for a week, '
                           'covering the creation account and the prologue of John.',
        'duration': 7,
        'readingsPerDay': 1,
    },
    'days': [
        {'day': 1, 'readings': [{'sv': 1001001, 'ev': 1001031}]},    # Genesis 1
        {'day': 2, 'readings': [{'sv': 1002001, 'ev': 1002025}]},    # Genesis 2
        {'day': 3, 'readings': [{'sv': 1003001, 'ev': 1003024}]},    # Genesis 3
        {'day': 4, 'readings': [{'sv': 43001001, 'ev': 43001051}]},  # John 1
        {'day': 5, 'readings': [{'sv': 43002001, 'ev': 43002025}]},  # John 2
        {'day': 6, 'readings': [{'sv': 43003001, 'ev': 43003036}]},  # John 3
        {'day': 7, 'readings': [{'sv': 19119097, 'ev': 19119112}]},  # Psalm 119:97-112
    ],
}


def populate_plan(cur, src):
    meta = src['meta']
    days = src['days']
    cur.execute(
        """INSERT INTO plans (id, name, description, author, full_description,
                              duration, readings_per_day)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (meta['id'], meta['name'], meta.get('description'), meta.get('author'),
         meta.get('fullDescription'), meta.get('duration', len(days)),
         meta.get('readingsPerDay', len(days[0]['readings']) if days else None)),
    )
    for day in days:
        # Only the range is stored; the reader names the passage itself.
        readings = [{'sv': r['sv'], 'ev': r['ev']} for r in day['readings']]
        cur.execute(
            'INSERT INTO plan_days (plan_id, day, readings_json) VALUES (?, ?, ?)',
            (meta['id'], day['day'], to_json(readings) or '[]'),
        )


# --- Quiz ------------------------------------------------------------------

def question(text, answer, theme, references, christ_focused=False, cross_references=None):
    q = {'question': text, 'answer': answer, 'theme': theme,
         'christFocused': christ_focused, 'references': references}
    if cross_references:
        q['crossReferences'] = cross_references
    return q


# A quiz follows a plan: each reading carries five questions for each age
# group. This one covers the first day of the sample plan, Genesis 1.
QUIZ = {
    'meta': {
        'schemaVersion': '1.0',
        'id': 'sample-quiz',
        'type': 'quiz',
        'planId': 'sample-plan',
        'name': 'Lamp Sample Quiz',
        'description': 'Questions on the first day of the Lamp Sample Plan, '
                       'graded for two age groups.',
        'questionsPerReading': 5,
        'ageGroups': [
            {'id': 'junior', 'label': 'Junior', 'ageRange': '8-12'},
            {'id': 'adult', 'label': 'Adult', 'ageRange': '18+'},
        ],
    },
    'days': [
        {
            'day': 1,
            'readings': [
                {
                    'sv': 1001001,
                    'ev': 1001031,
                    'quizzes': {
                        'junior': [
                            question('What did God make on the first day?',
                                     'Light. God said, Let there be light, and there was light.',
                                     'narrative', [1001003]),
                            question('What names did God give to the light and the darkness?',
                                     'He called the light day, and the darkness night.',
                                     'narrative', [1001005]),
                            question('On which day did God make the sun, the moon and the stars?',
                                     'On the fourth day.',
                                     'narrative', [1001016, 1001019]),
                            question('What did God make to fill the sea and the sky?',
                                     'Sea creatures and birds, on the fifth day.',
                                     'narrative', [1001020, 1001021, 1001023]),
                            question('In whose image did God make people?',
                                     'In His own image, the image of God.',
                                     'doctrine', [1001027]),
                        ],
                        'adult': [
                            question('What does the choice of the verb "created" in verse 1 '
                                     'signal about the subject of the sentence?',
                                     'The Hebrew verb bara is used only with God as its subject, '
                                     'so the grammar itself marks the act as uniquely divine.',
                                     'doctrine', [1001001]),
                            question('Which refrain closes each of the six days?',
                                     'There was evening, and there was morning, followed by '
                                     'the number of the day.',
                                     'narrative', [1001005, 1001031]),
                            question('What does God do with light and darkness, and with the '
                                     'waters, in the first two days?',
                                     'He separates them: light from darkness on the first day, '
                                     'and the waters above from the waters below on the second.',
                                     'narrative', [1001004, 1001006, 1001007]),
                            question('What charge does God give the first people in verse 28?',
                                     'To be fruitful and multiply, to fill the earth and subdue '
                                     'it, and to rule over every living creature.',
                                     'commandment', [1001028]),
                            question('Which Gospel opens with the same words as Genesis 1:1, '
                                     'and what does the echo suggest?',
                                     'John. In the beginning was the Word: the coming of Christ '
                                     'is framed as an act of creation rather than merely the '
                                     'start of a life.',
                                     'doctrine', [1001001], christ_focused=True,
                                     cross_references=[43001001, 43001003]),
                        ],
                    },
                },
            ],
        },
    ],
}


def populate_quiz(cur, src):
    meta = src['meta']
    cur.execute(
        """INSERT INTO quiz_modules (id, plan_id, name, description,
                                     questions_per_reading, age_groups_json)
           VALUES (?, ?, ?, ?, ?, ?)""",
        (meta['id'], meta['planId'], meta['name'], meta.get('description'),
         meta.get('questionsPerReading'), to_json(meta['ageGroups']) or '[]'),
    )
    for day in src['days']:
        for reading in day['readings']:
            # Age groups are written in alphabetical order of their IDs.
            for age_group in sorted(reading['quizzes']):
                for index, q in enumerate(reading['quizzes'][age_group]):
                    cur.execute(
                        """INSERT INTO quiz_questions (
                               quiz_module_id, day, sv, ev, age_group, question_index,
                               question_json, answer_json, theme, christ_focused,
                               references_json, cross_references_json
                           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                        (meta['id'], day['day'], reading['sv'], reading['ev'], age_group, index,
                         to_json(q['question']), to_json(q['answer']), q['theme'],
                         1 if q.get('christFocused') else 0,
                         to_json(q.get('references')), to_json(q.get('crossReferences'))),
                    )


# --- Notes -----------------------------------------------------------------

JOHN_INTRO = ('The prologue, verses 1 to 18, reads as a second Genesis. It opens with the '
              'same words, moves from creation to light, and arrives at the Word making His '
              'dwelling among us.')

# Like a commentary, a notes file covers one book.
NOTES = {
    'meta': {
        'schemaVersion': '1.1',
        'id': 'sample-notes',
        'type': 'notes',
        'name': 'Lamp Sample Notes',
        'description': 'Sample verse-keyed study notes.',
        'author': 'Lamp Bible',
    },
    'book': 'John',
    'bookNumber': 43,
    'chapters': [
        {
            'chapter': 1,
            'introduction': JOHN_INTRO,
            'lastModified': 1_770_000_000,
            'verses': [
                {'sv': 43001001, 'title': 'John 1:1',
                 'commentary': 'Three clauses, each raising the stakes: the Word existed, the '
                               'Word was with God, the Word was God. Note that the third clause '
                               'has no article in Greek, which is what keeps it from collapsing '
                               'into modalism.',
                 'lastModified': 1_770_000_000},
                {'sv': 43001014, 'title': 'John 1:14',
                 'commentary': 'Made His dwelling is literally "tabernacled" — the same image '
                               'as the tent in the wilderness. Worth reading alongside '
                               'Exodus 40.',
                 'lastModified': 1_770_000_000},
            ],
        },
    ],
}


def populate_notes(cur, src):
    meta = src['meta']
    module_id = meta['id']
    book = src['bookNumber']
    cur.execute(
        """INSERT INTO module_meta (id, name, description, author, version, is_editable)
           VALUES (?, ?, ?, ?, ?, 1)""",
        (module_id, meta.get('name') or 'Notes', meta.get('description'), meta.get('author'),
         meta.get('schemaVersion')),
    )
    cur.execute(
        'INSERT INTO note_book_meta (module_id, book, book_number, media_json) VALUES (?, ?, ?, ?)',
        (module_id, src['book'], book, to_json(src.get('media'))),
    )

    def add_note(verse_id, title, content, end, last_modified, footnotes):
        # Notes are stored as plain text, with their footnotes added for search.
        text = plain_text(content)
        footnote_text = [plain_text(f.get('content')) for f in footnotes or []]
        cur.execute(
            """INSERT INTO note_entries (
                   id, module_id, verse_id, book, chapter, verse, title, content,
                   verse_refs_json, last_modified, footnotes_json, search_text,
                   record_change_tag
               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)""",
            (f'{module_id}:{verse_id}', module_id, verse_id, verse_id // 1_000_000,
             verse_id // 1_000 % 1_000, verse_id % 1_000, title, text,
             # Where a note covers a range, this records the range's end.
             to_json([end] if end is not None else None),
             last_modified, to_json(footnotes), ' '.join([text] + [t for t in footnote_text if t])),
        )

    for chapter in src['chapters']:
        if chapter.get('introduction'):
            # A chapter introduction is a note on verse 0 of the chapter.
            add_note(ref(book, chapter['chapter'], 0),
                     chapter.get('introductionTitle') or 'Introduction',
                     chapter['introduction'], None, chapter.get('lastModified'),
                     chapter.get('footnotes'))
        for verse in chapter.get('verses', []):
            add_note(verse['sv'], verse.get('title'), verse['commentary'], verse.get('ev'),
                     verse.get('lastModified'), verse.get('footnotes'))

    cur.execute("INSERT INTO note_fts(note_fts) VALUES('rebuild')")


# --- Devotional ------------------------------------------------------------

DEVOTIONAL_LAMP = ('A lamp in the ancient world lit the next step, not the whole road. That is '
                   'the promise being made: enough light to move, not enough to see the end.')
DEVOTIONAL_FLOODLIGHT = ('Most of the frustration in reading Scripture for guidance comes from '
                         'wanting a floodlight when what has been offered is a lamp.')

# A devotional module is one piece of writing.
DEVOTIONAL = {
    'meta': {
        'schemaVersion': '1.1',
        'id': 'sample-devotional',
        'type': 'devotional',
        'title': 'A Lamp for the Feet',
        'author': 'Lamp Bible',
        'tags': ['guidance', 'scripture'],
        'category': 'devotional',
        'keyScriptures': [{'sv': 19119105, 'label': 'Psalm 119:105'}],
        'created': 1_770_000_000,
        'lastModified': 1_770_000_000,
    },
    'summary': 'Scripture promises light for the next step, not for the whole road.',
    'content': [
        {'type': 'blockquote', 'content': {'text': PSALM_119_105}},
        {'type': 'paragraph', 'content': {'text': DEVOTIONAL_LAMP}},
        {'type': 'paragraph', 'content': {'text': DEVOTIONAL_FLOODLIGHT}},
    ],
}


def populate_devotional(cur, src):
    meta = src['meta']
    module_id = meta['id']
    series = meta.get('series') or {}
    cur.execute(
        """INSERT INTO module_meta (id, name, description, author, version, is_editable)
           VALUES (?, ?, ?, ?, ?, 1)""",
        (module_id, meta['title'], meta.get('subtitle'), meta.get('author'),
         meta.get('schemaVersion')),
    )
    cur.execute(
        """INSERT INTO devotional_entries (
               id, module_id, title, subtitle, author, date, tags, category,
               series_id, series_name, series_order, key_scriptures_json,
               summary_json, content_json, footnotes_json, related_ids,
               created, last_modified, search_text, record_change_tag,
               subscription_id, is_read_only, media_json
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, 0, ?)""",
        (module_id, module_id, meta['title'], meta.get('subtitle'), meta.get('author'),
         meta.get('date'),
         # Tags and related writings are stored as comma-separated lists.
         ','.join(meta['tags']) if 'tags' in meta else None,
         meta.get('category'), series.get('id'), series.get('name'), series.get('order'),
         to_json(meta.get('keyScriptures')), to_json(src.get('summary')),
         to_json(src['content']) or '[]', to_json(src.get('footnotes')),
         ','.join(src['relatedDevotionals']) if 'relatedDevotionals' in src else None,
         meta.get('created', 0), meta.get('lastModified'),
         joined(meta['title'], meta.get('subtitle'), plain_text(src.get('summary')),
                plain_text(src['content']), plain_text(src.get('footnotes'))),
         to_json(src.get('media'))),
    )


# --- Highlights ------------------------------------------------------------

HIGHLIGHTS = {
    'meta': {
        'schemaVersion': '1.0',
        'id': 'sample-highlights',
        'type': 'highlights',
        'name': 'Lamp Sample Highlights',
        'description': 'Highlights against the sample translation, one per style.',
        'translationId': 'SAMPLEs',
        'created': 1_770_000_000,
        'lastModified': 1_770_000_000,
        # A theme gives a colour and style combination a meaning.
        'themes': [
            {'color': 'FFE066', 'style': 0, 'name': 'God at work'},
            {'color': '7FB3D5', 'style': 1, 'name': 'Who Christ is'},
        ],
    },
    # Offsets are derived from the sample translation's verse text, which is
    # exactly why a highlight module names the translation it belongs to.
    'verses': [
        {'ref': 1001001, 'highlights': [
            highlight(GEN_1_1, 'God created', 0, 'FFE066'),
        ]},
        {'ref': 43001001, 'highlights': [
            highlight(JOHN_1_1, 'the Word was God', 1, '7FB3D5'),
            highlight(JOHN_1_1, 'with God', 2, '82C596'),
        ]},
        {'ref': 19119105, 'highlights': [
            highlight(PSALM_119_105, 'a lamp to my feet', 3, 'D98BC3'),
        ]},
    ],
}


def normalized_color(color):
    """Hex colours are stored without a leading # and in upper case."""
    if color is None:
        return None
    bare = color[1:] if color.startswith('#') else color
    is_hex = len(bare) in (6, 8) and all(c in '0123456789abcdefABCDEF' for c in bare)
    return bare.upper() if is_hex else bare


def populate_highlights(cur, src):
    meta = src['meta']
    cur.execute(
        """INSERT INTO highlight_meta (id, name, description, translation_id,
                                       created, last_modified)
           VALUES (?, ?, ?, ?, ?, ?)""",
        (meta['id'], meta.get('name') or 'Highlights', meta.get('description'),
         meta['translationId'], meta.get('created'), meta.get('lastModified')),
    )
    for verse in src['verses']:
        for h in verse['highlights']:
            cur.execute(
                'INSERT INTO highlights (ref, sc, ec, style, color) VALUES (?, ?, ?, ?, ?)',
                (verse['ref'], h['sc'], h['ec'], h['style'], normalized_color(h.get('color'))),
            )
    for theme in meta.get('themes', []):
        cur.execute(
            'INSERT INTO highlight_themes (color, style, name, description) VALUES (?, ?, ?, ?)',
            (normalized_color(theme['color']), theme['style'], theme['name'],
             theme.get('description')),
        )


# The type names are the ones recorded in module_format.
MODULES = [
    ('translation', TRANSLATION_SQL, TRANSLATION, populate_translation),
    ('dictionary', DICTIONARY_SQL, DICTIONARY, populate_dictionary),
    ('commentary', COMMENTARY_SQL, COMMENTARY, populate_commentary),
    ('book', BOOK_SQL, BOOK, populate_book),
    ('plan', PLAN_SQL, PLAN, populate_plan),
    ('quiz', QUIZ_SQL, QUIZ, populate_quiz),
    ('notes', NOTES_SQL, NOTES, populate_notes),
    ('devotional', DEVOTIONAL_SQL, DEVOTIONAL, populate_devotional),
    ('highlights', HIGHLIGHTS_SQL, HIGHLIGHTS, populate_highlights),
]


def main():
    print(f'Building {len(MODULES)} sample modules\n')
    for kind, ddl, source, populate in MODULES:
        print(f'{kind}:')
        build(kind, ddl, source, populate)
    print('\nDone.')


if __name__ == '__main__':
    main()
