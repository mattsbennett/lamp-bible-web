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
