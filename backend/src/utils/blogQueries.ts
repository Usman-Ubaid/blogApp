import { db } from "../config/db";

interface Blog {
  id: number;
  heading: string;
  body: string;
  created_at: string;
  updated_at: string;
}

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

export const dbBlogs: () => Promise<Blog[]> = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM blogs", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

export const dbBlogById: (id: string) => Promise<Blog[]> = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM blogs WHERE id = ${?}", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

export const editBlogQuery: (
  id: string,
  heading: string,
  body: string
) => Promise<number> = (id, heading, body) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE blogs SET heading=?, body=? WHERE id=?",
      [heading, body, id],
      (error, results) => {
        if (error) {
          reject({ message: "Error updating blog", error });
        }
        resolve(results?.affectedRows);
      }
    );
  });
};
