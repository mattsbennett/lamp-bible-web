import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, Callout, Table } from '@/components/docs/DocPage'
import { DownloadList } from '@/components/docs/DownloadList'
import { moduleDownloads } from '@/lib/module-downloads'

export const metadata: Metadata = {
  title: 'Building a .lamp file',
  description:
    'Step by step: turn module JSON into a SQLite database, compress it with raw DEFLATE, verify it, and install it in Lamp Bible.',
}

export default function Page() {
  const sqlFiles = moduleDownloads.map((m) => m.sql)

  return (
    <DocPage
      href="/docs/modules/building"
      title="Building a .lamp file"
      intro="The mechanics, end to end. A .lamp is a SQLite database with a specific set of tables, compressed with raw DEFLATE — no proprietary tooling involved."
    >
      <h2>What a .lamp file actually is</h2>
      <p>Three things, in this order:</p>
      <ol>
        <li>
          A SQLite database containing the tables for one module type, including a{' '}
          <code>module_format</code> row that names the module and its type.
        </li>
        <li>
          Compressed with <strong>raw DEFLATE</strong> — zlib level 9, <code>wbits=-15</code>, no
          zlib or gzip header.
        </li>
        <li>
          Saved as <code>&lt;module id&gt;.lamp</code>. The app registers the extension as a
          document type, so the file opens straight into Lamp Bible from Files, Mail or a share
          sheet.
        </li>
      </ol>
      <p>
        The <code>wbits=-15</code> detail is the one people get wrong. A standard{' '}
        <code>zlib.compress()</code> or <code>gzip</code> produces a header the app’s decompressor
        will not accept. It must be a bare DEFLATE stream.
      </p>
      <p>
        The file name matters too. On iPhone and iPad the app takes the module’s identifier from
        the file name, then refuses the file if any of its rows belong to a different module. A
        module whose ID is <code>MYBIBLEs</code> must travel as <code>MYBIBLEs.lamp</code>.
      </p>

      <Callout title="Devotionals have two extra shapes">
        <p>
          A devotional shared from the app may also be a plain JSON document, or a ZIP bundle
          holding the document plus its images and audio. All three use the <code>.lamp</code>{' '}
          extension and the app detects which it is on open. For anything you build yourself, the
          SQLite form below is the one to target.
        </p>
      </Callout>

      <h2>The reference implementation</h2>
      <p>
        The sample modules published on this site are produced by a single self-contained Python
        script with no third-party dependencies — SQLite and DEFLATE are both in the standard
        library. It is written to be read, and it is the shortest complete answer to “how do I make
        one of these”. Every sample on the{' '}
        <Link href="/docs/modules/downloads">downloads page</Link> comes out of it, and each one is
        checked against the app’s own compiler: given the same JSON, the app writes the same
        tables and the same rows.
      </p>

      <h3>1. Create the tables</h3>
      <p>
        Each module type has its own set of tables, and every type has the{' '}
        <code>module_format</code> table. The definitions must match what the app reads; they are
        published here so you do not have to guess.
      </p>
      <DownloadList files={sqlFiles} />

      <h3>2. Write your rows</h3>
      <p>
        Insert your content using ordinary SQL, starting with the <code>module_format</code> row.
        Structured fields — annotations, footnotes, senses, readings — are stored as JSON text in
        their respective <code>*_json</code> columns.
      </p>

      <pre>
        <code>{`import json, sqlite3

conn = sqlite3.connect('MYBIBLEs.db')
conn.executescript(open('translation.sql').read())
cur = conn.cursor()

# Which module this is, and what type. The app reads this row first.
cur.execute(
    'INSERT INTO module_format (format_version, module_type, module_id) VALUES (?, ?, ?)',
    ('1.0', 'translation', 'MYBIBLEs'),
)
cur.execute(
    'INSERT INTO translation_meta (id, name, abbreviation, language) VALUES (?, ?, ?, ?)',
    ('MYBIBLEs', 'My Bible', 'MYBIBLE', 'en'),
)
cur.execute(
    """INSERT INTO verses (ref, book, chapter, verse, text, annotations_json, paragraph)
       VALUES (?, ?, ?, ?, ?, ?, ?)""",
    (
        1001001, 1, 1, 1,
        'In the beginning God created the heaven and the earth.',
        json.dumps([
            {'type': 'strongs', 'start': 17, 'end': 20,
             'text': 'God', 'data': {'strongs': 'H430'}}
        ]),
        1,
    ),
)
# ...and a books row for each book, and headings, in the same way.

conn.commit()
conn.close()`}</code>
      </pre>

      <p>
        The module ID goes in three places: <code>module_format</code>, the type’s own metadata
        row, and the file name. They must all agree.
      </p>

      <Callout tone="warn" title="Derive character offsets, never count them">
        <p>
          Annotation and highlight offsets are the one error that produces a perfectly valid file
          that behaves wrongly — the module installs, nothing complains, and the wrong words get
          tagged. Compute them from the text:
        </p>
        <pre>
          <code>{`start = text.find('God')
end = start + len('God')`}</code>
        </pre>
        <p>
          The sample generator does exactly this, and its verifier asserts that every annotation’s
          recorded text still matches the slice its offsets cover.
        </p>
      </Callout>

      <h3>3. Compress it</h3>
      <pre>
        <code>{`import zlib

data = open('MYBIBLEs.db', 'rb').read()

compressor = zlib.compressobj(level=9, wbits=-15)   # raw DEFLATE, no header
compressed = compressor.compress(data) + compressor.flush()

# Always verify the round trip before discarding the original.
assert zlib.decompressobj(wbits=-15).decompress(compressed) == data

open('MYBIBLEs.lamp', 'wb').write(compressed)       # named after the module ID`}</code>
      </pre>
      <p>Typical compression is 95% or better, since SQLite pages are mostly empty space.</p>

      <h3>4. Verify before you ship it</h3>
      <p>Read it back the way the app will, and check four things:</p>

      <pre>
        <code>{`data = zlib.decompressobj(wbits=-15).decompress(open('MYBIBLEs.lamp','rb').read())

assert data.startswith(b'SQLite format 3\\x00')      # it is a database

conn = sqlite3.connect(path_to_temp_file_containing(data))
assert conn.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'
assert conn.execute(
    'SELECT module_type, module_id FROM module_format'
).fetchall() == [('translation', 'MYBIBLEs')]        # one row, matching the file name
assert conn.execute('SELECT count(*) FROM verses').fetchone()[0] > 0`}</code>
      </pre>

      <h3>5. Install it</h3>
      <p>
        Move the file onto the device — AirDrop, Files, iCloud Drive, or an email to yourself — and
        open it, or import it from the module manager in Settings. If a module with the same
        identifier is already installed you will be asked whether to overwrite.
      </p>

      <h2>Table definitions by type</h2>
      <p>
        These are the tables the app’s own compiler writes. The downloadable <code>.sql</code>{' '}
        files above are the complete definitions, indexes included; the versions here are condensed
        to show the shape.
      </p>

      <h3>Every module: module_format</h3>
      <p>
        One row naming the module and its type. The app reads it before anything else. Without it
        the app has to guess the type from the other tables, and a module that carries a{' '}
        <code>module_metadata</code> table is taken for a dictionary.
      </p>
      <pre>
        <code>{`CREATE TABLE module_format (
    format_version TEXT NOT NULL,       -- "1.0"
    module_type TEXT NOT NULL,          -- translation | dictionary | commentary | book |
                                        -- plan | quiz | notes | devotional | highlights
    module_id TEXT NOT NULL             -- the file name, without .lamp
);`}</code>
      </pre>

      <h3>Translation</h3>
      <p>
        The largest schema, and one of three with a full-text index — the only one with an insert
        trigger to keep it current.
      </p>
      <pre>
        <code>{`CREATE TABLE translation_meta (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, abbreviation TEXT NOT NULL,
    description TEXT, language TEXT NOT NULL, language_name TEXT,
    text_direction TEXT NOT NULL DEFAULT 'ltr', translation_philosophy TEXT,
    year INTEGER, publisher TEXT, copyright TEXT, copyright_year INTEGER,
    license TEXT, source_texts_json TEXT, features_json TEXT,
    versification TEXT DEFAULT 'standard'
);

CREATE TABLE books (
    id INTEGER PRIMARY KEY,             -- book number, 1-66
    book_id TEXT NOT NULL, name TEXT NOT NULL,
    testament TEXT NOT NULL, chapter_count INTEGER NOT NULL
);

CREATE TABLE verses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref INTEGER NOT NULL UNIQUE,        -- BBCCCVVV
    book INTEGER NOT NULL, chapter INTEGER NOT NULL, verse INTEGER NOT NULL,
    text TEXT NOT NULL,                 -- plain text, used for display and search
    annotations_json TEXT,              -- Strong's, red-letter, and the rest
    footnotes_json TEXT,
    footnote_refs_json TEXT,            -- where each footnote marker sits in text
    paragraph INTEGER DEFAULT 0,
    poetry_json TEXT
);

CREATE TABLE headings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book INTEGER NOT NULL, chapter INTEGER NOT NULL,
    before_verse INTEGER NOT NULL, level INTEGER NOT NULL DEFAULT 1,
    text TEXT NOT NULL
);

CREATE VIRTUAL TABLE verses_fts USING fts5(
    text, content='verses', content_rowid='id',
    tokenize='unicode61 remove_diacritics 2'
);

CREATE TRIGGER verses_fts_insert AFTER INSERT ON verses BEGIN
    INSERT INTO verses_fts(rowid, text) VALUES (new.id, new.text);
END;`}</code>
      </pre>

      <Callout title="Keep text and annotations separate">
        <p>
          The <code>text</code> column holds clean, unmarked prose. Everything else — Strong’s
          numbers, red-letter marking, emphasis — lives in <code>annotations_json</code> as offsets
          into that text. This is what lets search, display and read-aloud all work off one string
          without stripping markup.
        </p>
      </Callout>

      <h3>Dictionary</h3>
      <p>
        The one type with a <code>module_metadata</code> table. Each sense in{' '}
        <code>senses_json</code> carries its <code>definition</code>, <code>gloss</code>,{' '}
        <code>partOfSpeech</code> and <code>references</code>, with its number stored as a string.
      </p>
      <pre>
        <code>{`CREATE TABLE module_metadata (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT,
    author TEXT, version TEXT, key_type TEXT, schema_version TEXT,
    type TEXT, series_abbrev TEXT, series_full TEXT, editor TEXT,
    publisher TEXT, year INTEGER, isbn TEXT, language TEXT
);

CREATE TABLE dictionary_entries (
    id TEXT PRIMARY KEY,                -- "<module id>:<key>"
    module_id TEXT NOT NULL,
    key TEXT NOT NULL,                  -- e.g. "H430", "G3056"
    lemma TEXT NOT NULL,
    transliteration TEXT, pronunciation TEXT,
    senses_json TEXT, metadata_json TEXT,
    search_text TEXT                    -- definitions and glosses, for searching
);`}</code>
      </pre>

      <h3>Commentary</h3>
      <p>
        One book of a commentary series per file, and no metadata table: the series name and
        abbreviation and the volume title live on the single <code>commentary_books</code> row.
        Units form a self-referencing tree. <code>unit_type</code> is <code>section</code>,{' '}
        <code>pericope</code> or <code>verse</code>, with <code>parent_id</code> pointing at the
        enclosing unit; a chapter introduction is a section at level 0.
      </p>
      <pre>
        <code>{`CREATE TABLE commentary_books (
    id TEXT PRIMARY KEY,                -- "<module id>:<book number>"
    module_id TEXT NOT NULL, book_number INTEGER NOT NULL,
    series_full TEXT, series_abbrev TEXT, title TEXT, author TEXT,
    editor TEXT, publisher TEXT, year INTEGER,
    abbreviations_json TEXT, front_matter_json TEXT, indices_json TEXT
);

CREATE TABLE commentary_units (
    id TEXT PRIMARY KEY, module_id TEXT NOT NULL,
    book INTEGER NOT NULL, chapter INTEGER,
    sv INTEGER NOT NULL, ev INTEGER,
    unit_type TEXT NOT NULL,            -- section | pericope | verse
    level INTEGER NOT NULL DEFAULT 1,
    parent_id TEXT, title TEXT, suffix TEXT,
    introduction_json TEXT, translation_json TEXT,
    commentary_json TEXT, footnotes_json TEXT,
    search_text TEXT NOT NULL DEFAULT '',
    order_index INTEGER NOT NULL DEFAULT 0   -- reading order
);`}</code>
      </pre>

      <h3>Book</h3>
      <p>
        A long-form publication: one row for the book, one per section. Sections nest through{' '}
        <code>parent_id</code>, and each holds its content blocks as JSON. Footnotes are defined
        once, for the whole book, and any section’s text can point at them.
      </p>
      <pre>
        <code>{`CREATE TABLE book_modules (
    id TEXT PRIMARY KEY, title TEXT NOT NULL, subtitle TEXT,
    description TEXT, author TEXT, editor TEXT, publisher TEXT,
    year INTEGER, edition TEXT, isbn TEXT, language TEXT NOT NULL,
    text_direction TEXT NOT NULL DEFAULT 'ltr', copyright TEXT,
    license TEXT, version TEXT, schema_version TEXT NOT NULL,
    tags_json TEXT, cover_media_id TEXT,
    is_editable INTEGER NOT NULL DEFAULT 0,
    created INTEGER, last_modified INTEGER,
    footnotes_json TEXT,                -- shared by every section
    media_json TEXT
);

CREATE TABLE book_sections (
    id TEXT PRIMARY KEY,                -- "<module id>:<section id>"
    module_id TEXT NOT NULL REFERENCES book_modules(id) ON DELETE CASCADE,
    section_id TEXT NOT NULL,
    parent_id TEXT REFERENCES book_sections(id) ON DELETE CASCADE,
    section_type TEXT NOT NULL,         -- front-matter | part | chapter | section | ...
    number TEXT, title TEXT NOT NULL, subtitle TEXT,
    depth INTEGER NOT NULL, order_index INTEGER NOT NULL,
    key_scriptures_json TEXT, content_json TEXT NOT NULL,
    search_text TEXT NOT NULL DEFAULT '',
    UNIQUE(module_id, section_id)
);

CREATE VIRTUAL TABLE book_sections_fts USING fts5(
    title, search_text, content='book_sections', content_rowid='rowid'
);`}</code>
      </pre>

      <h3>Notes and devotionals</h3>
      <p>
        The two editable text types, sharing a small <code>module_meta</code> table. Notes are
        keyed to a verse and cover one book per file; a chapter introduction is a note on verse 0.
        A devotional module is a single document, which may be dated or placed in a series.
      </p>
      <pre>
        <code>{`CREATE TABLE module_meta (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT,
    author TEXT, version TEXT, is_editable INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE note_book_meta (
    module_id TEXT PRIMARY KEY REFERENCES module_meta(id) ON DELETE CASCADE,
    book TEXT NOT NULL, book_number INTEGER NOT NULL, media_json TEXT
);

CREATE TABLE note_entries (
    id TEXT PRIMARY KEY,                -- "<module id>:<verse_id>"
    module_id TEXT NOT NULL,
    verse_id INTEGER NOT NULL,          -- BBCCCVVV
    book INTEGER NOT NULL, chapter INTEGER NOT NULL, verse INTEGER NOT NULL,
    title TEXT, content TEXT NOT NULL,  -- plain text
    verse_refs_json TEXT,               -- [end ref], when a note covers a range
    last_modified INTEGER, footnotes_json TEXT,
    search_text TEXT, record_change_tag TEXT
);

CREATE VIRTUAL TABLE note_fts USING fts5(
    title, search_text, content='note_entries', content_rowid='rowid'
);

CREATE TABLE devotional_entries (
    id TEXT PRIMARY KEY,                -- the module ID
    module_id TEXT NOT NULL REFERENCES module_meta(id) ON DELETE CASCADE,
    title TEXT NOT NULL, subtitle TEXT, author TEXT,
    date TEXT,                          -- "2026-01-01"
    tags TEXT, category TEXT,           -- tags comma-separated
    series_id TEXT, series_name TEXT, series_order INTEGER,
    key_scriptures_json TEXT, summary_json TEXT,
    content_json TEXT NOT NULL, footnotes_json TEXT,
    related_ids TEXT, created INTEGER NOT NULL, last_modified INTEGER,
    search_text TEXT, record_change_tag TEXT,
    subscription_id TEXT, is_read_only INTEGER, media_json TEXT
);`}</code>
      </pre>

      <h3>Highlights</h3>
      <pre>
        <code>{`CREATE TABLE highlight_meta (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT,
    translation_id TEXT NOT NULL,       -- offsets are meaningless without this
    created INTEGER, last_modified INTEGER
);

CREATE TABLE highlights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref INTEGER NOT NULL,               -- BBCCCVVV
    sc INTEGER NOT NULL,                -- start character, inclusive
    ec INTEGER NOT NULL,                -- end character, exclusive
    style INTEGER NOT NULL DEFAULT 0,   -- 0 fill, 1 solid, 2 dashed, 3 dotted
    color TEXT                          -- hex without #, e.g. "FFE066"; null means the default
);

CREATE TABLE highlight_themes (         -- what a colour and style mean
    color TEXT NOT NULL, style INTEGER NOT NULL,
    name TEXT NOT NULL, description TEXT,
    PRIMARY KEY (color, style)
);`}</code>
      </pre>

      <h3>Reading plans and quizzes</h3>
      <p>
        A quiz names the plan it belongs to through <code>plan_id</code>, which is how the reader
        knows there are questions available for today’s portion.
      </p>
      <pre>
        <code>{`CREATE TABLE plans (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT,
    author TEXT, full_description TEXT,
    duration INTEGER NOT NULL, readings_per_day INTEGER
);

CREATE TABLE plan_days (
    plan_id TEXT NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
    day INTEGER NOT NULL,
    readings_json TEXT NOT NULL,        -- [{ "sv": ..., "ev": ... }]
    PRIMARY KEY (plan_id, day)
);

CREATE TABLE quiz_modules (
    id TEXT PRIMARY KEY, plan_id TEXT NOT NULL, name TEXT NOT NULL,
    description TEXT, questions_per_reading INTEGER,
    age_groups_json TEXT NOT NULL       -- [{ "id": ..., "label": ..., "ageRange": ... }]
);

CREATE TABLE quiz_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_module_id TEXT NOT NULL REFERENCES quiz_modules(id) ON DELETE CASCADE,
    day INTEGER NOT NULL, sv INTEGER NOT NULL, ev INTEGER NOT NULL,
    age_group TEXT NOT NULL, question_index INTEGER NOT NULL,
    question_json TEXT NOT NULL, answer_json TEXT NOT NULL,
    theme TEXT NOT NULL, christ_focused INTEGER NOT NULL DEFAULT 0,
    references_json TEXT, cross_references_json TEXT,
    UNIQUE(quiz_module_id, day, sv, ev, age_group, question_index)
);`}</code>
      </pre>

      <h2>Common mistakes</h2>
      <Table>
        <thead>
          <tr>
            <th>Symptom</th>
            <th>Cause</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Module will not import</td>
            <td>
              Compressed with a zlib or gzip header. Use <code>wbits=-15</code>.
            </td>
          </tr>
          <tr>
            <td>Rejected on iPhone or iPad as containing another module’s rows</td>
            <td>
              The file name does not match the module ID. Name it{' '}
              <code>&lt;module id&gt;.lamp</code>.
            </td>
          </tr>
          <tr>
            <td>Imports as the wrong type — a commentary or notes module shows up as a dictionary</td>
            <td>
              No <code>module_format</code> row, so the app guessed the type from the other tables.
              Add the row, and use the tables for the type you mean.
            </td>
          </tr>
          <tr>
            <td>Wrong words tagged or highlighted</td>
            <td>Character offsets counted by hand. Derive them from the text.</td>
          </tr>
          <tr>
            <td>Verses out of order or missing</td>
            <td>
              <code>ref</code> not in BBCCCVVV form — two digits of book, three of chapter, three of
              verse.
            </td>
          </tr>
          <tr>
            <td>Search finds nothing</td>
            <td>
              The full-text index was never filled. Finish by rebuilding it, as in{' '}
              <code>{"INSERT INTO verses_fts(verses_fts) VALUES('rebuild')"}</code>. Only{' '}
              <code>verses_fts</code> has a trigger to fill it as rows arrive; for{' '}
              <code>note_fts</code> and <code>book_sections_fts</code> the rebuild is the only way.
            </td>
          </tr>
          <tr>
            <td>Highlights land on the wrong text</td>
            <td>
              <code>translation_id</code> names a translation whose wording differs from the one
              the offsets were taken against.
            </td>
          </tr>
        </tbody>
      </Table>

      <h2>Next</h2>
      <p>
        For the JSON shape of each module type — the schemas the source documents validate against —
        see <Link href="/docs/modules/authoring">Authoring modules</Link>. To get the sample
        modules, schemas and table definitions as files, see{' '}
        <Link href="/docs/modules/downloads">Downloads</Link>.
      </p>
    </DocPage>
  )
}
