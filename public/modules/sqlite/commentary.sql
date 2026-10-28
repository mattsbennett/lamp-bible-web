-- Every module names itself and its type here. The apps read this row first;
-- without it they guess the type from the other tables, and can guess wrong.
CREATE TABLE module_format (
    format_version TEXT NOT NULL,
    module_type TEXT NOT NULL,
    module_id TEXT NOT NULL
);

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
