import { Request, Response } from "express";
import { getAllBlogs, getBlogById, insertBlog } from "../utils/blogQueries";

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
      const allBlogs = await getAllBlogs();
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
      const blog = await getBlogById(id);
      if (blog) {
        return res.status(200).json({ message: "success", blog });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default blogController;
