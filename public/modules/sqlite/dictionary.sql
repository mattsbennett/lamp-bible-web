-- Every module names itself and its type here. The apps read this row first;
-- without it they guess the type from the other tables, and can guess wrong.
CREATE TABLE module_format (
    format_version TEXT NOT NULL,
    module_type TEXT NOT NULL,
    module_id TEXT NOT NULL
);

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
