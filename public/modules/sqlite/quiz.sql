CREATE TABLE IF NOT EXISTS quiz_modules (
    id TEXT PRIMARY KEY,
    plan_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    questions_per_reading INTEGER,
    age_groups_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_module_id TEXT NOT NULL REFERENCES quiz_modules(id) ON DELETE CASCADE,
    day INTEGER NOT NULL,
    sv INTEGER NOT NULL,
    ev INTEGER NOT NULL,
    age_group TEXT NOT NULL,
    question_index INTEGER NOT NULL,
    question_json TEXT NOT NULL,
    answer_json TEXT NOT NULL,
    theme TEXT NOT NULL,
    christ_focused INTEGER NOT NULL DEFAULT 0,
    references_json TEXT,
    cross_references_json TEXT,
    UNIQUE(quiz_module_id, day, sv, ev, age_group, question_index)
);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_module ON quiz_questions(quiz_module_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_day ON quiz_questions(quiz_module_id, day);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_age ON quiz_questions(age_group);
