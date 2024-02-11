import { Request } from "express";
import multer from "multer";
import { FileFilterCallback } from "multer";

const fileFilter = function (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

// Configure multer
export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
});
