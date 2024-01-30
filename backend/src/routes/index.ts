import { Router } from "express";
import userRouter from "./user";
import blogRoutes from "./blog";

const router = Router();

router.use("/api", userRouter);
router.use("/api", blogRoutes);

export default router;
