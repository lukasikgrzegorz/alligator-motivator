import sql from "better-sqlite3";

const db = sql("database.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    deleted_at TEXT DEFAULT NULL
  );
`);

db.exec(`CREATE TABLE IF NOT EXISTS sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

db.exec(`
  CREATE TABLE IF NOT EXISTS children (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    points INTEGER NOT NULL DEFAULT 0,
    user_id INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    deleted_at TEXT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    points INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    child_id INTEGER NOT NULL,
    is_recurring BOOLEAN NOT NULL DEFAULT 0,
    start_date TEXT,
    end_date TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    deleted_at TEXT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (child_id) REFERENCES children(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS rewards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    points INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    child_id INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    deleted_at TEXT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (child_id) REFERENCES children(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS points_activities (
    id TEXT PRIMARY KEY,
    child_id INTEGER NOT NULL,
    activity_type TEXT NOT NULL,
    points INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    deleted_at TEXT DEFAULT NULL,
    FOREIGN KEY (child_id) REFERENCES children(id)
  );
`);

export default db;
