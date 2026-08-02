CREATE TABLE IF NOT EXISTS highlight_meta (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    translation_id TEXT NOT NULL,
    created INTEGER,
    last_modified INTEGER
);

CREATE TABLE IF NOT EXISTS highlights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref INTEGER NOT NULL,
    sc INTEGER NOT NULL,
    ec INTEGER NOT NULL,
    style INTEGER NOT NULL DEFAULT 0,
    color TEXT
);
CREATE INDEX IF NOT EXISTS idx_highlights_ref ON highlights(ref);
CREATE INDEX IF NOT EXISTS idx_highlights_style ON highlights(style);
