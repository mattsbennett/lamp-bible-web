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
