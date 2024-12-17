import db from "./db";
import { randomUUID } from "crypto";

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
  const id = randomUUID();
  const result = db
    .prepare(
      "INSERT INTO tasks (id, name, image, points, user_id, child_id, is_recurring, start_date, end_date) VALUES (?,?,?,?,?,?,?,?,?)"
    )
    .run(
      id,
      name,
      image,
      points,
      userId,
      childId,
      isRecurring,
      startDate,
      endDate
    );

  return result.lastInsertRowid;
}

export function deleteTask(id, userId) {
  const stmt = db.prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?");
  stmt.run(id, userId);
} 

export function getUncompletedTasks(childId) {
  const today = new Date().toISOString().split('T')[0];
  const stmt = db.prepare(`
    SELECT * FROM tasks 
    WHERE child_id = ? 
    AND id NOT IN (
      SELECT activity_id FROM child_activities 
      WHERE child_id = ? 
      AND DATE(created_at) = ?
    )
    AND (is_recurring = 1 OR (start_date <= ? AND end_date >= ?))
  `);
  return stmt.all(childId, childId, today, today, today);
}
