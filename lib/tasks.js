import db from "./db";

export function getTasks(childId) {
  const stmt = db.prepare("SELECT * FROM tasks WHERE child_id = ?");
  return stmt.all(childId);
}

export function createTask(
  name,
  image,
  points,
  userId,
  childId,
  isRecurring,
  startDate,
  endDate
) {
  const result = db
    .prepare(
      "INSERT INTO tasks (name, image, points, user_id, child_id, is_recurring, start_date, end_date) VALUES (?,?,?,?,?,?,?,?)"
    )
    .run(name, image, points, userId, childId, isRecurring, startDate, endDate);

  return result.lastInsertRowid;
}
