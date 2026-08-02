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
