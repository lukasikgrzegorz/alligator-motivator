import db from "./db";

export function getChildren(userId) {
  const stmt = db.prepare("SELECT * FROM children WHERE user_id = ?");
  return stmt.all(userId);
}

export function getChild(id, userId) {
  const stmt = db.prepare("SELECT * FROM children WHERE id =? AND user_id = ?");
  return stmt.get(id, userId);
}

export function createChildren(name, image, userId) {
  const result = db
    .prepare("INSERT INTO children (name, image, user_id) VALUES (?,?,?)")
    .run(name, image, userId);

  return result.lastInsertRowid;
}

export async function updatePoints(id, userId, points) {
  const stmt = db.prepare(
    "UPDATE children SET points = ? WHERE id = ? AND user_id = ?"
  );
  stmt.run(points, id, userId);
}
