import { Request, Response } from "express";
import { insertBlog } from "../utils/blogQueries";

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
};

export default blogController;
