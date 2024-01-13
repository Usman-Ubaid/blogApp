import { db } from "../config/db";
import { hashPassword } from "../module/auth";

export const checkExistingEmail: (
  email: string
) => Promise<{ email: string, password: string }[]> = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT email, password FROM users WHERE email = ?`,
      [email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
};

export const checkExistingUsername: (
  username: string
) => Promise<{ username: string }[]> = (username) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT username FROM users WHERE email = ?`,
      [username],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
};

export const insertUserDb: (
  username: string,
  email: string,
  password: string
) => Promise<{ insertId: number }> = (username, email, password) => {
  return new Promise(async (resolve, reject) => {
    const hashedPassword = await hashPassword(password);
    db.query(
      `INSERT INTO users (username, email, password)
            VALUES (?,?,?)`,
      [username, email, hashedPassword],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve({ insertId: results.insertId });
      }
    );
  });
};
