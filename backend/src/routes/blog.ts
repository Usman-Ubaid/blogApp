import { Router } from "express";
import blogController from "../controllers/blog";

const router = Router();

router.post("/blog", blogController.createBlog);

export default router;
