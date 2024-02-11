import { Router } from "express";
import blogController from "../controllers/blog";
import { protect } from "../middleware/auth";
import { upload } from "../config/multerConfig";

const router = Router();

router.get("/blog", protect, blogController.getAllBlogs);
router.get("/blog/:id", protect, blogController.getBlogById);
router.post(
  "/blog",
  protect,
  upload.single("image"),
  blogController.createBlog
);
router.post("/blog/upload", upload.single("image"), blogController.uploadImage);
router.put("/blog/:id", protect, blogController.editBlog);
router.delete("/blog/:id", protect, blogController.deleteBlog);

export default router;
