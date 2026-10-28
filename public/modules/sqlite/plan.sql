-- Every module names itself and its type here. The apps read this row first;
-- without it they guess the type from the other tables, and can guess wrong.
CREATE TABLE module_format (
    format_version TEXT NOT NULL,
    module_type TEXT NOT NULL,
    module_id TEXT NOT NULL
);

CREATE TABLE plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    author TEXT,
    full_description TEXT,
    duration INTEGER NOT NULL,
    readings_per_day INTEGER
);

CREATE TABLE plan_days (
    plan_id TEXT NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
    day INTEGER NOT NULL,
    readings_json TEXT NOT NULL,
    PRIMARY KEY (plan_id, day)
);
CREATE INDEX idx_plan_days_plan ON plan_days(plan_id, day);
