import { db } from "../config/db";

export const checkExistingEmail: (
  email: string
) => Promise<{ email: string }[]> = (email: string) => {
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
