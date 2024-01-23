import { Request, Response } from "express";
import {
  dbBlogs,
  dbBlogById,
  insertBlog,
  editBlogQuery,
  deleteBlogQuery,
} from "../utils/blogQueries";

const blogController = {
  createBlog: async (req: Request, res: Response) => {
    const { heading, body } = req.body;
    if (!heading || !body) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    try {
      const result = await insertBlog(heading, body);
      if (result) {
        return res.status(201).json({
          message: "Success",
          blog: { id: result?.id },
        });
      } else {
        res
          .status(500)
          .json({ error: "Unexpected response from the database" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  getAllBlogs: async (req: Request, res: Response) => {
    try {
      const allBlogs = await dbBlogs();
      if (allBlogs && allBlogs.length > 0) {
        return res.status(200).json({ message: "success", blogs: allBlogs });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  getBlogById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const blog = await dbBlogById(id);
      if (blog && blog.length > 0) {
        return res.status(200).json({ message: "success", blog });
      } else {
        return res.status(200).json({ error: "Blog not found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  editBlog: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { heading, body } = req.body;
    try {
      const blog = await dbBlogById(id);
      if (blog && blog.length > 0) {
        const updatedBlog = await editBlogQuery(
          id,
          heading || blog[0].heading,
          body || blog[0].body
        );

        if (updatedBlog === 1) {
          return res.status(200).json({ message: "success" });
        }
      } else {
        return res.status(400).json({ error: "No blog found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  deleteBlog: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const blog = await dbBlogById(id);
      if (blog && blog.length > 0) {
        const removeBlog = await deleteBlogQuery(id);
        if (removeBlog === 1) {
          return res.status(200).json({ message: "success " });
        }
      }
      return res.status(400).json({ error: "Blog not found" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default blogController;
