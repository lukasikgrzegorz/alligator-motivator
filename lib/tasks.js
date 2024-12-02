import db from "./db";

export function getTasks(childId) {
  const stmt = db.prepare("SELECT * FROM tasks WHERE child_id = ?");
  return stmt.all(childId);
}

export function createTask(name, image, description, points, userId, childId) {
  const result = db
    .prepare(
      "INSERT INTO tasks (name, image, description, points, user_id, child_id) VALUES (?,?,?,?,?,?)"
    )
    .run(name, image, description, points, userId, childId);

  return result.lastInsertRowid;
}
