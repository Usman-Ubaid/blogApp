import { Router } from "express";
import blogController from "../controllers/blog";

const router = Router();

router.get("/blog", blogController.getAllBlogs);
router.get("/blog/:id", blogController.getBlogById);
router.post("/blog", blogController.createBlog);
router.put("/blog/:id", blogController.editBlog);

export default router;
