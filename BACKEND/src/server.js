import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from project root (MERN directory)
dotenv.config({ path: path.join(__dirname, "../.env") });

import connectDb from "./db/index.js";
import { User } from "./models/user.models.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 5000;

connectDb()
  .then(async () => {
    await User.init(); // 🔥 build indexes
    console.log("User indexes initialized");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Connection failed, ${err}`);
    process.exit(1);
  });