import db from "./db";
import { randomUUID } from "crypto";

export function getChildren(userId) {
  const stmt = db.prepare("SELECT * FROM children WHERE user_id = ?");
  return stmt.all(userId);
}

export function getChild(id, userId) {
  const stmt = db.prepare("SELECT * FROM children WHERE id =? AND user_id = ?");
  return stmt.get(id, userId);
}

export function createChild(name, image, userId) {
  const id = randomUUID();
  const result = db
    .prepare("INSERT INTO children (id, name, image, user_id) VALUES (?,?,?,?)")
    .run(id, name, image, userId);

  return result.lastInsertRowid;
}

export function deleteChild(id, userId) {
  const stmt = db.prepare("DELETE FROM children WHERE id = ? AND user_id = ?");
  stmt.run(id, userId);
}   

export function updateChild(id, userId, name, image) {
  const stmt = db.prepare(
    "UPDATE children SET name = ?, image = ? WHERE id = ? AND user_id = ?"
  );
  stmt.run(name, image, id, userId);
}

export function updatePoints(id, userId, points) {
  const stmt = db.prepare(
    "UPDATE children SET points = ? WHERE id = ? AND user_id = ?"
  );
  stmt.run(points, id, userId);
}
