import { db } from "../config/db";

export const checkExistingEmail: (
  email: string
) => Promise<{ email: string }[]> = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT email FROM users WHERE email = ?`,
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
) => Promise<{ insertId: number }> = (
  username: string,
  email: string,
  password: string
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (username, email, password)
            VALUES (?,?,?)`,
      [username, email, password],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve({ insertId: results.insertId });
      }
    );
  });
};
