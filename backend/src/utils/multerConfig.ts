import { Request } from "express";
import multer from "multer";
import { FileFilterCallback, Multer } from "multer";
import path from "path";

// Define storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    // You can customize this as needed (e.g., add a timestamp)
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Define file filter based on MIME types
const fileFilter = function (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  // Allow only images (you can adjust this as needed)
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

// Configure multer
export const upload = multer({
  storage: storage,
  fileFilter,
});
