import { db } from "../config/db";

export const insertBlog: (
  heading: string,
  body: string
) => Promise<{ id: number }> = async (heading: string, body: string) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO blogs (heading, body) VALUES (?,?)`,
      [heading, body],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve({ id: results?.insertId });
      }
    );
  });
};
