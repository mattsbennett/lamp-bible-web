#!/usr/bin/env python3
"""
Builds the downloadable sample modules published on the documentation site.

This script is itself the worked example: /docs/modules/building walks through
it, so the code is meant to be read. Every module type the app supports is
produced here, each from a small JSON document, using the same table
definitions the app expects and the same raw-DEFLATE container.

    python3 scripts/build_sample_modules.py

Outputs, all committed to the repo:

    public/modules/samples/<type>/lamp-sample-<type>.lamp   installable module
    public/modules/samples/<type>/lamp-sample-<type>.json   the source document
    public/modules/sqlite/<type>.sql                        the table definitions

All sample content is either public domain (KJV verse text, Strong's glosses)
or written for this purpose. Nothing here reproduces licensed material.
"""

import json
import sqlite3
import zlib
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SAMPLES = REPO / 'public/modules/samples'
SQL_DIR = REPO / 'public/modules/sqlite'


# ---------------------------------------------------------------------------
# Table definitions
#
# These must match what the app reads. They are transcribed from the converter
# scripts in the (private) lamp-bible-modules repo; scripts/sync-module-assets.mjs
# hashes those converters so that a change upstream shows up as drift here.
# ---------------------------------------------------------------------------

TRANSLATION_SQL = """
CREATE TABLE IF NOT EXISTS translation_meta (
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

CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    book_id TEXT NOT NULL,
    name TEXT NOT NULL,
    testament TEXT NOT NULL,
    chapter_count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS verses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref INTEGER NOT NULL UNIQUE,
    book INTEGER NOT NULL,
    chapter INTEGER NOT NULL,
    verse INTEGER NOT NULL,
    text TEXT NOT NULL,
    annotations_json TEXT,
    footnotes_json TEXT,
    paragraph INTEGER DEFAULT 0,
    poetry_json TEXT
);
CREATE INDEX IF NOT EXISTS idx_verses_ref ON verses(ref);
CREATE INDEX IF NOT EXISTS idx_verses_book_chapter ON verses(book, chapter);

CREATE TABLE IF NOT EXISTS headings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book INTEGER NOT NULL,
    chapter INTEGER NOT NULL,
    before_verse INTEGER NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    text TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_headings_chapter ON headings(book, chapter);

CREATE VIRTUAL TABLE IF NOT EXISTS verses_fts USING fts5(
    text,
    content='verses',
    content_rowid='id',
    tokenize='unicode61 remove_diacritics 2'
);

CREATE TRIGGER IF NOT EXISTS verses_fts_insert AFTER INSERT ON verses BEGIN
    INSERT INTO verses_fts(rowid, text) VALUES (new.id, new.text);
END;
"""

MODULE_METADATA_SQL = """
CREATE TABLE IF NOT EXISTS module_metadata (
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
"""

DICTIONARY_SQL = MODULE_METADATA_SQL + """
CREATE TABLE IF NOT EXISTS dictionary_entries (
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
CREATE INDEX IF NOT EXISTS idx_dict_module ON dictionary_entries(module_id);
CREATE INDEX IF NOT EXISTS idx_dict_key ON dictionary_entries(key);
CREATE INDEX IF NOT EXISTS idx_dict_lemma ON dictionary_entries(lemma);
"""

COMMENTARY_SQL = MODULE_METADATA_SQL + """
CREATE TABLE IF NOT EXISTS commentary_books (
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
CREATE INDEX IF NOT EXISTS idx_comm_books_module ON commentary_books(module_id);
CREATE INDEX IF NOT EXISTS idx_comm_books_book ON commentary_books(book_number);

CREATE TABLE IF NOT EXISTS commentary_units (
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
CREATE INDEX IF NOT EXISTS idx_comm_units_module ON commentary_units(module_id);
CREATE INDEX IF NOT EXISTS idx_comm_units_verse ON commentary_units(sv, ev);
CREATE INDEX IF NOT EXISTS idx_comm_units_book_chapter ON commentary_units(book, chapter);
CREATE INDEX IF NOT EXISTS idx_comm_units_parent ON commentary_units(parent_id);
CREATE INDEX IF NOT EXISTS idx_comm_units_type ON commentary_units(unit_type);
"""

NOTES_SQL = MODULE_METADATA_SQL + """
CREATE TABLE IF NOT EXISTS note_entries (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL,
    verse_id INTEGER NOT NULL,
    title TEXT,
    content TEXT NOT NULL,
    verse_refs TEXT,
    last_modified INTEGER
);
CREATE INDEX IF NOT EXISTS idx_notes_module ON note_entries(module_id);
CREATE INDEX IF NOT EXISTS idx_notes_verse ON note_entries(verse_id);
"""

DEVOTIONAL_SQL = MODULE_METADATA_SQL + """
CREATE TABLE IF NOT EXISTS devotional_entries (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL,
    month_day TEXT NOT NULL,
    tags TEXT,
    title TEXT,
    content TEXT NOT NULL,
    verse_refs TEXT,
    last_modified INTEGER
);
CREATE INDEX IF NOT EXISTS idx_devotional_module ON devotional_entries(module_id);
CREATE INDEX IF NOT EXISTS idx_devotional_month_day ON devotional_entries(month_day);
"""

HIGHLIGHTS_SQL = """
CREATE TABLE IF NOT EXISTS highlight_meta (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    translation_id TEXT NOT NULL,
    created INTEGER,
    last_modified INTEGER
);

CREATE TABLE IF NOT EXISTS highlights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref INTEGER NOT NULL,
    sc INTEGER NOT NULL,
    ec INTEGER NOT NULL,
    style INTEGER NOT NULL DEFAULT 0,
    color TEXT
);
CREATE INDEX IF NOT EXISTS idx_highlights_ref ON highlights(ref);
CREATE INDEX IF NOT EXISTS idx_highlights_style ON highlights(style);
"""

PLAN_SQL = """
CREATE TABLE IF NOT EXISTS plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    author TEXT,
    full_description TEXT,
    duration INTEGER NOT NULL,
    readings_per_day INTEGER
);

CREATE TABLE IF NOT EXISTS plan_days (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id TEXT NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
    day INTEGER NOT NULL,
    readings_json TEXT NOT NULL,
    UNIQUE(plan_id, day)
);
CREATE INDEX IF NOT EXISTS idx_plan_days_plan ON plan_days(plan_id);
CREATE INDEX IF NOT EXISTS idx_plan_days_day ON plan_days(plan_id, day);
"""

QUIZ_SQL = """
CREATE TABLE IF NOT EXISTS quiz_modules (
    id TEXT PRIMARY KEY,
    plan_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    questions_per_reading INTEGER,
    age_groups_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_questions (
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
CREATE INDEX IF NOT EXISTS idx_quiz_questions_module ON quiz_questions(quiz_module_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_day ON quiz_questions(quiz_module_id, day);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_age ON quiz_questions(age_group);
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


def highlight(text: str, phrase: str, style: int, color: str, occurrence: int = 0) -> dict:
    """Build a highlight span from the phrase it should cover."""
    start, end = span(text, phrase, occurrence)
    return {'sc': start, 'ec': end, 'style': style, 'color': color}


def write_lamp(db_path: Path) -> Path:
    """
    Compress a SQLite database into a .lamp file with raw DEFLATE.

    wbits=-15 selects raw DEFLATE with no zlib or gzip header, which is what
    the app's decompressor expects. The round trip is verified before the
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
    out_dir = SAMPLES / kind
    out_dir.mkdir(parents=True, exist_ok=True)
    SQL_DIR.mkdir(parents=True, exist_ok=True)

    stem = f'lamp-sample-{kind}'
    (out_dir / f'{stem}.json').write_text(json.dumps(source, indent=2, ensure_ascii=False) + '\n')
    (SQL_DIR / f'{kind}.sql').write_text(ddl.strip() + '\n')

    db_path = out_dir / f'{stem}.db'
    if db_path.exists():
        db_path.unlink()

    conn = sqlite3.connect(db_path)
    conn.executescript(ddl)
    populate(conn.cursor(), source)
    conn.commit()
    conn.close()

    write_lamp(db_path)


# ---------------------------------------------------------------------------
# Sample source documents
#
# Verse text is the King James Version (public domain). Commentary, notes,
# devotional and quiz content is original, written for these samples.
# ---------------------------------------------------------------------------

# Verse text, named so that annotations and highlights can be positioned by
# phrase rather than by hand-counted offset.
GEN_1_1 = 'In the beginning God created the heaven and the earth.'
GEN_1_2 = ('And the earth was without form, and void; and darkness was upon the face '
           'of the deep.')
GEN_1_3 = 'And God said, Let there be light: and there was light.'
JOHN_1_1 = ('In the beginning was the Word, and the Word was with God, and the Word '
            'was God.')
JOHN_1_14 = 'And the Word was made flesh, and dwelt among us.'
PSALM_119_105 = 'Thy word is a lamp unto my feet, and a light unto my path.'

TRANSLATION = {
    'meta': {
        'schemaVersion': '1.0',
        'id': 'SAMPLEs',
        'type': 'translation',
        'name': 'Lamp Sample Translation',
        'abbreviation': 'SAMPLE',
        'description': 'A handful of KJV verses demonstrating the translation schema.',
        'language': 'en',
        'languageName': 'English',
        'textDirection': 'ltr',
        'translationPhilosophy': 'formal',
        'license': 'Public Domain',
        'versification': 'standard',
        'features': {'strongs': True, 'morphology': False, 'redLetter': True, 'footnotes': True},
    },
    'books': [
        {
            'id': 'Gen',
            'name': 'Genesis',
            'number': 1,
            'testament': 'OT',
            'chapterCount': 50,
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
            'chapterCount': 21,
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
            'chapterCount': 150,
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
               text_direction, translation_philosophy, license, features_json, versification
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (meta['id'], meta['name'], meta['abbreviation'], meta.get('description'),
         meta['language'], meta.get('languageName'), meta['textDirection'],
         meta.get('translationPhilosophy'), meta.get('license'),
         json.dumps(meta.get('features')), meta.get('versification', 'standard')),
    )

    for book in src['books']:
        cur.execute(
            'INSERT INTO books (id, book_id, name, testament, chapter_count) VALUES (?, ?, ?, ?, ?)',
            (book['number'], book['id'], book['name'], book['testament'], book['chapterCount']),
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
                annotations = content.get('annotations') or None
                cur.execute(
                    """INSERT INTO verses (
                           ref, book, chapter, verse, text,
                           annotations_json, footnotes_json, paragraph, poetry_json
                       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (verse['ref'], book['number'], chapter['chapter'], verse['v'],
                     content['text'],
                     json.dumps(annotations) if annotations else None,
                     json.dumps(verse['footnotes']) if verse.get('footnotes') else None,
                     1 if verse.get('paragraph') else 0,
                     json.dumps(verse['poetry']) if verse.get('poetry') else None),
                )


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
                {'id': 1, 'def': 'God, the supreme God of Israel.'},
                {'id': 2, 'def': 'gods, in the plural, of the gods of the nations.'},
            ],
            'metadata': {'partOfSpeech': 'noun masculine plural', 'gloss': 'God, gods'},
        },
        {
            'key': 'G3056',
            'lemma': 'λόγος',
            'transliteration': 'logos',
            'pronunciation': 'log-os',
            'senses': [
                {'id': 1, 'def': 'a word, spoken or written; the expression of a thought.'},
                {'id': 2, 'def': 'the divine Word, used of Christ in John 1.',
                 'references': [{'sv': 43001001}]},
            ],
            'metadata': {'partOfSpeech': 'noun masculine', 'gloss': 'word, account, reason'},
        },
        {
            'key': 'H5216',
            'lemma': 'נִיר',
            'transliteration': 'niyr',
            'pronunciation': 'neer',
            'senses': [
                {'id': 1, 'def': 'a lamp; figuratively, the light of life or guidance.',
                 'references': [{'sv': 19119105}]},
            ],
            'metadata': {'partOfSpeech': 'noun masculine', 'gloss': 'lamp, light'},
        },
    ],
}


def populate_module_metadata(cur, meta):
    cur.execute(
        """INSERT INTO module_metadata (
               id, name, description, author, version, key_type,
               schema_version, type, language
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (meta['id'], meta['name'], meta.get('description'), meta.get('author'),
         meta.get('version'), meta.get('keyType'), meta.get('schemaVersion'),
         meta['type'], meta.get('language')),
    )


def populate_dictionary(cur, src):
    meta = src['meta']
    populate_module_metadata(cur, meta)
    for entry in src['entries']:
        senses_text = ' '.join(s['def'] for s in entry.get('senses', []))
        cur.execute(
            """INSERT INTO dictionary_entries (
                   id, module_id, key, lemma, transliteration, pronunciation,
                   senses_json, metadata_json, search_text
               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (f"{meta['id']}_{entry['key']}", meta['id'], entry['key'], entry['lemma'],
             entry.get('transliteration'), entry.get('pronunciation'),
             json.dumps(entry.get('senses'), ensure_ascii=False),
             json.dumps(entry.get('metadata'), ensure_ascii=False),
             f"{entry['lemma']} {entry.get('transliteration', '')} {senses_text}".strip()),
        )


GEN_NOTE = ('The verb translated created is reserved in Hebrew for divine activity. It is '
            'never used with a human subject, which is the first thing the sentence tells '
            'us about its subject.')
JOHN_NOTE = ('The opening phrase deliberately echoes Genesis 1:1. John is not starting a '
             'biography; he is starting a creation account.')

COMMENTARY = {
    'meta': {
        'schemaVersion': '2.1',
        'id': 'sample-commentary',
        'type': 'commentary',
        'name': 'Lamp Sample Commentary',
        'description': 'Original notes on two verses, showing the section/pericope/verse nesting.',
        'author': 'Lamp Bible',
        'seriesAbbrev': 'LSC',
        'seriesFull': 'Lamp Sample Commentary',
        'version': '1.0.0',
        'language': 'en',
    },
    'books': [
        {
            'book': 'Gen',
            'bookNumber': 1,
            'title': 'Genesis',
            'units': [
                {'id': 'gen-sec-1', 'unitType': 'section', 'level': 1, 'book': 1, 'chapter': 1,
                 'sv': 1001001, 'ev': 1001003, 'title': 'The Opening of the Account',
                 'introduction': {'text': 'The first three verses establish who acts, what is '
                                          'made, and by what means.'}},
                {'id': 'gen-per-1', 'unitType': 'pericope', 'level': 2, 'parentId': 'gen-sec-1',
                 'book': 1, 'chapter': 1, 'sv': 1001001, 'ev': 1001001,
                 'title': 'In the beginning'},
                {'id': 'gen-v-1', 'unitType': 'verse', 'level': 3, 'parentId': 'gen-per-1',
                 'book': 1, 'chapter': 1, 'sv': 1001001,
                 'commentary': {
                     'text': GEN_NOTE,
                     'annotations': annotate(GEN_NOTE, [
                         ('strongs', 'created', {'strongs': 'H1254'}),
                     ]),
                 }},
            ],
        },
        {
            'book': 'John',
            'bookNumber': 43,
            'title': 'John',
            'units': [
                {'id': 'john-sec-1', 'unitType': 'section', 'level': 1, 'book': 43, 'chapter': 1,
                 'sv': 43001001, 'ev': 43001014, 'title': 'The Prologue'},
                {'id': 'john-v-1', 'unitType': 'verse', 'level': 2, 'parentId': 'john-sec-1',
                 'book': 43, 'chapter': 1, 'sv': 43001001,
                 'commentary': {
                     'text': JOHN_NOTE,
                     'annotations': annotate(JOHN_NOTE, [
                         ('scripture', 'Genesis 1:1', {'sv': 1001001}),
                     ]),
                 }},
            ],
        },
    ],
}


def populate_commentary(cur, src):
    meta = src['meta']
    populate_module_metadata(cur, meta)
    for book in src['books']:
        cur.execute(
            """INSERT INTO commentary_books (
                   id, module_id, book_number, series_full, series_abbrev, title, author
               ) VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (f"{meta['id']}_{book['bookNumber']}", meta['id'], book['bookNumber'],
             meta['seriesFull'], meta['seriesAbbrev'], book['title'], meta.get('author')),
        )
        for order, unit in enumerate(book['units']):
            search_text = ''
            if unit.get('commentary'):
                search_text = unit['commentary']['text']
            elif unit.get('introduction'):
                search_text = unit['introduction']['text']
            cur.execute(
                """INSERT INTO commentary_units (
                       id, module_id, book, chapter, sv, ev, unit_type, level, parent_id,
                       title, introduction_json, commentary_json, search_text, order_index
                   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (unit['id'], meta['id'], unit['book'], unit.get('chapter'), unit['sv'],
                 unit.get('ev'), unit['unitType'], unit['level'], unit.get('parentId'),
                 unit.get('title'),
                 json.dumps(unit['introduction']) if unit.get('introduction') else None,
                 json.dumps(unit['commentary']) if unit.get('commentary') else None,
                 search_text, order),
            )


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
        {'day': 1, 'readings': [{'sv': 1001001, 'ev': 1001031, 'label': 'Genesis 1'}]},
        {'day': 2, 'readings': [{'sv': 1002001, 'ev': 1002025, 'label': 'Genesis 2'}]},
        {'day': 3, 'readings': [{'sv': 1003001, 'ev': 1003024, 'label': 'Genesis 3'}]},
        {'day': 4, 'readings': [{'sv': 43001001, 'ev': 43001051, 'label': 'John 1'}]},
        {'day': 5, 'readings': [{'sv': 43002001, 'ev': 43002025, 'label': 'John 2'}]},
        {'day': 6, 'readings': [{'sv': 43003001, 'ev': 43003036, 'label': 'John 3'}]},
        {'day': 7, 'readings': [{'sv': 19119097, 'ev': 19119112, 'label': 'Psalm 119:97-112'}]},
    ],
}


def populate_plan(cur, src):
    meta = src['meta']
    cur.execute(
        """INSERT INTO plans (id, name, description, author, full_description,
                              duration, readings_per_day)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (meta['id'], meta['name'], meta.get('description'), meta.get('author'),
         meta.get('fullDescription'), meta['duration'], meta.get('readingsPerDay')),
    )
    for day in src['days']:
        cur.execute(
            'INSERT INTO plan_days (plan_id, day, readings_json) VALUES (?, ?, ?)',
            (meta['id'], day['day'], json.dumps(day['readings'])),
        )


QUIZ = {
    'meta': {
        'schemaVersion': '1.0',
        'id': 'sample-quiz',
        'type': 'quiz',
        'planId': 'sample-plan',
        'name': 'Lamp Sample Quiz',
        'description': 'Questions for the Lamp Sample Plan, graded for two age groups.',
        'questionsPerReading': 1,
        'ageGroups': ['junior', 'adult'],
    },
    'questions': [
        {'day': 1, 'sv': 1001001, 'ev': 1001031, 'ageGroup': 'junior', 'questionIndex': 0,
         'question': 'What did God make on the first day?',
         'answer': 'Light. God said, Let there be light, and there was light.',
         'theme': 'Creation', 'christFocused': False,
         'references': [{'sv': 1001003}]},
        {'day': 1, 'sv': 1001001, 'ev': 1001031, 'ageGroup': 'adult', 'questionIndex': 0,
         'question': 'What does the choice of the verb "created" in verse 1 signal about '
                     'the subject of the sentence?',
         'answer': 'The Hebrew verb bara is used only with God as its subject, so the '
                   'grammar itself marks the act as uniquely divine.',
         'theme': 'Creation', 'christFocused': False,
         'references': [{'sv': 1001001}]},
        {'day': 4, 'sv': 43001001, 'ev': 43001051, 'ageGroup': 'junior', 'questionIndex': 0,
         'question': 'Who is the Word that John writes about?',
         'answer': 'Jesus. John says the Word was with God, was God, and became flesh.',
         'theme': 'The Word', 'christFocused': True,
         'references': [{'sv': 43001001}, {'sv': 43001014}]},
        {'day': 4, 'sv': 43001001, 'ev': 43001051, 'ageGroup': 'adult', 'questionIndex': 0,
         'question': 'Why does John open with "In the beginning"?',
         'answer': 'It echoes Genesis 1:1, framing the incarnation as an act of creation '
                   'rather than merely the start of a life.',
         'theme': 'The Word', 'christFocused': True,
         'references': [{'sv': 43001001}],
         'crossReferences': [{'sv': 1001001}]},
    ],
}


def populate_quiz(cur, src):
    meta = src['meta']
    cur.execute(
        """INSERT INTO quiz_modules (id, plan_id, name, description,
                                     questions_per_reading, age_groups_json)
           VALUES (?, ?, ?, ?, ?, ?)""",
        (meta['id'], meta['planId'], meta['name'], meta.get('description'),
         meta.get('questionsPerReading'), json.dumps(meta['ageGroups'])),
    )
    for q in src['questions']:
        cur.execute(
            """INSERT INTO quiz_questions (
                   quiz_module_id, day, sv, ev, age_group, question_index,
                   question_json, answer_json, theme, christ_focused,
                   references_json, cross_references_json
               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (meta['id'], q['day'], q['sv'], q['ev'], q['ageGroup'], q['questionIndex'],
             json.dumps(q['question']), json.dumps(q['answer']), q['theme'],
             1 if q['christFocused'] else 0,
             json.dumps(q.get('references')) if q.get('references') else None,
             json.dumps(q.get('crossReferences')) if q.get('crossReferences') else None),
        )


NOTES = {
    'meta': {
        'schemaVersion': '1.1',
        'id': 'sample-notes',
        'type': 'notes',
        'name': 'Lamp Sample Notes',
        'description': 'Sample verse-keyed study notes.',
        'author': 'Lamp Bible',
        'version': '1.0.0',
        'language': 'en',
    },
    'entries': [
        {'verseId': 43001001, 'title': 'John 1:1',
         'content': 'Three clauses, each raising the stakes: the Word existed, the Word was '
                    'with God, the Word was God. Note that the third clause has no article '
                    'in Greek, which is what keeps it from collapsing into modalism.',
         'verseRefs': [{'sv': 43001001}]},
        {'verseId': 43001014, 'title': 'John 1:14',
         'content': 'Dwelt is literally "tabernacled" — the same image as the tent in the '
                    'wilderness. Worth reading alongside Exodus 40.',
         'verseRefs': [{'sv': 43001014}, {'sv': 2040034, 'ev': 2040038}]},
        {'verseId': 1001001, 'title': 'Genesis 1:1',
         'content': 'The whole doctrine of creation out of nothing rests on this sentence '
                    'being a statement rather than a summary of what follows.',
         'verseRefs': [{'sv': 1001001}]},
    ],
}


def populate_notes(cur, src):
    meta = src['meta']
    populate_module_metadata(cur, meta)
    for i, entry in enumerate(src['entries']):
        cur.execute(
            """INSERT INTO note_entries (
                   id, module_id, verse_id, title, content, verse_refs, last_modified
               ) VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (f"{meta['id']}_{i + 1}", meta['id'], entry['verseId'], entry.get('title'),
             entry['content'], json.dumps(entry.get('verseRefs')), 1_770_000_000),
        )


DEVOTIONAL = {
    'meta': {
        'schemaVersion': '1.1',
        'id': 'sample-devotional',
        'type': 'devotional',
        'name': 'Lamp Sample Devotional',
        'description': 'Two short original readings, keyed by month and day.',
        'author': 'Lamp Bible',
        'version': '1.0.0',
        'language': 'en',
    },
    'entries': [
        {'monthDay': '01-01', 'title': 'Before Anything Else',
         'tags': ['creation', 'beginnings'],
         'content': 'Scripture opens without argument. It does not prove God; it assumes '
                    'him and describes what he does. The first thing we are told about '
                    'God is not what he is like but that he makes.\n\n'
                    'A year is about to begin. Start it the way the Bible does — not with '
                    'a resolution, but with the fact that something exists which did not '
                    'have to.',
         'verseRefs': [{'sv': 1001001, 'ev': 1001003}]},
        {'monthDay': '01-02', 'title': 'A Lamp for the Feet',
         'tags': ['guidance', 'scripture'],
         'content': 'A lamp in the ancient world lit the next step, not the whole road. '
                    'That is the promise being made: enough light to move, not enough to '
                    'see the end.\n\n'
                    'Most of the frustration in reading Scripture for guidance comes from '
                    'wanting a floodlight when what has been offered is a lamp.',
         'verseRefs': [{'sv': 19119105}]},
    ],
}


def populate_devotional(cur, src):
    meta = src['meta']
    populate_module_metadata(cur, meta)
    for i, entry in enumerate(src['entries']):
        cur.execute(
            """INSERT INTO devotional_entries (
                   id, module_id, month_day, tags, title, content, verse_refs, last_modified
               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (f"{meta['id']}_{i + 1}", meta['id'], entry['monthDay'],
             json.dumps(entry.get('tags')), entry.get('title'), entry['content'],
             json.dumps(entry.get('verseRefs')), 1_770_000_000),
        )


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
    },
    # Offsets are derived from the sample translation's verse text, which is
    # exactly why a highlight module names the translation it belongs to.
    'verses': [
        {'ref': 1001001, 'highlights': [
            highlight(GEN_1_1, 'God created', 0, '#FFE066'),
        ]},
        {'ref': 43001001, 'highlights': [
            highlight(JOHN_1_1, 'the Word was God', 1, '#7FB3D5'),
            highlight(JOHN_1_1, 'with God', 2, '#82C596'),
        ]},
        {'ref': 19119105, 'highlights': [
            highlight(PSALM_119_105, 'a lamp unto my feet', 3, '#D98BC3'),
        ]},
    ],
}


def populate_highlights(cur, src):
    meta = src['meta']
    cur.execute(
        """INSERT INTO highlight_meta (id, name, description, translation_id,
                                       created, last_modified)
           VALUES (?, ?, ?, ?, ?, ?)""",
        (meta['id'], meta['name'], meta.get('description'), meta['translationId'],
         meta.get('created'), meta.get('lastModified')),
    )
    for verse in src['verses']:
        for h in verse['highlights']:
            cur.execute(
                'INSERT INTO highlights (ref, sc, ec, style, color) VALUES (?, ?, ?, ?, ?)',
                (verse['ref'], h['sc'], h['ec'], h['style'], h.get('color')),
            )


MODULES = [
    ('translation', TRANSLATION_SQL, TRANSLATION, populate_translation),
    ('dictionary', DICTIONARY_SQL, DICTIONARY, populate_dictionary),
    ('commentary', COMMENTARY_SQL, COMMENTARY, populate_commentary),
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
