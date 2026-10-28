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
