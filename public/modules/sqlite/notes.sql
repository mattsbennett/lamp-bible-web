-- Every module names itself and its type here. The apps read this row first;
-- without it they guess the type from the other tables, and can guess wrong.
CREATE TABLE module_format (
    format_version TEXT NOT NULL,
    module_type TEXT NOT NULL,
    module_id TEXT NOT NULL
);

CREATE TABLE module_meta (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    author TEXT,
    version TEXT,
    is_editable INTEGER NOT NULL DEFAULT 1
);

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
