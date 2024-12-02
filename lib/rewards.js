import db from "./db";

export function getRewards(childId) {
  const stmt = db.prepare("SELECT * FROM rewards WHERE child_id = ?");
  return stmt.all(childId);
}

export function createReward(
  name,
  image,
  description,
  points,
  userId,
  childId
) {
  const result = db
    .prepare(
      "INSERT INTO rewards (name, image, description, points, user_id, child_id) VALUES (?,?,?,?,?,?)"
    )
    .run(name, image, description, points, userId, childId);

  return result.lastInsertRowid;
}
