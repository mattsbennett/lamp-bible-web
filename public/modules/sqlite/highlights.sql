-- Every module names itself and its type here. The apps read this row first;
-- without it they guess the type from the other tables, and can guess wrong.
CREATE TABLE module_format (
    format_version TEXT NOT NULL,
    module_type TEXT NOT NULL,
    module_id TEXT NOT NULL
);

CREATE TABLE highlight_meta (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    translation_id TEXT NOT NULL,
    created INTEGER,
    last_modified INTEGER
);

CREATE TABLE highlights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref INTEGER NOT NULL,
    sc INTEGER NOT NULL,
    ec INTEGER NOT NULL,
    style INTEGER NOT NULL DEFAULT 0,
    color TEXT
);
CREATE INDEX idx_highlights_ref ON highlights(ref, sc);

CREATE TABLE highlight_themes (
    color TEXT NOT NULL,
    style INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    PRIMARY KEY (color, style)
);
