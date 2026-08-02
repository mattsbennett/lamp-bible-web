CREATE TABLE IF NOT EXISTS plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    author TEXT,
    full_description TEXT,
    duration INTEGER NOT NULL,
    readings_per_day INTEGER
);

CREATE TABLE IF NOT EXISTS plan_days (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id TEXT NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
    day INTEGER NOT NULL,
    readings_json TEXT NOT NULL,
    UNIQUE(plan_id, day)
);
CREATE INDEX IF NOT EXISTS idx_plan_days_plan ON plan_days(plan_id);
CREATE INDEX IF NOT EXISTS idx_plan_days_day ON plan_days(plan_id, day);
