import db from "./db";
import { randomUUID } from "crypto";

export function getRewards(childId) {
  const stmt = db.prepare("SELECT * FROM rewards WHERE child_id = ?");
  return stmt.all(childId);
}

export function createReward(name, image, points, userId, childId) {
  const id = randomUUID();
  const result = db
    .prepare(
      "INSERT INTO rewards (id, name, image, points, user_id, child_id) VALUES (?,?,?,?,?,?)"
    )
    .run(id, name, image, points, userId, childId);

  return result.lastInsertRowid;
}

export function deleteReward(id, userId) {
  const stmt = db.prepare("DELETE FROM rewards WHERE id = ? AND user_id = ?");
  stmt.run(id, userId);
}
