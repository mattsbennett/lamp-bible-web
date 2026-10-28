-- Every module names itself and its type here. The apps read this row first;
-- without it they guess the type from the other tables, and can guess wrong.
CREATE TABLE module_format (
    format_version TEXT NOT NULL,
    module_type TEXT NOT NULL,
    module_id TEXT NOT NULL
);

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
