import { Router } from "express";
import blogController from "../controllers/blog";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/blog", protect, blogController.getAllBlogs);
router.get("/blog/:id", protect, blogController.getBlogById);
router.post("/blog", protect, blogController.createBlog);
router.put("/blog/:id", protect, blogController.editBlog);
router.delete("/blog/:id", protect, blogController.deleteBlog);

export default router;
