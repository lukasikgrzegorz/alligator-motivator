import db from "./db";
import { randomUUID } from "crypto";

export function createUser(email, password) {
  const id = randomUUID();
  try {
    const result = db
      .prepare("INSERT INTO users (id, email, password) VALUES (?,?,?)")
      .run(id, email, password);
    if (result.changes === 1) {
      return id;
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export function getUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email =?").get(email);
}
