import multer from "multer";
import fs from "fs";
import path from "path";

// Since server starts from src → go one level up to backend/public/temp
const uploadDir = path.join(process.cwd(), "..", "public", "temp");

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage });
