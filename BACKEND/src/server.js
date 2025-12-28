import dotenv from "dotenv";
dotenv.config({ path: "../.env"});

import connectDb from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 5000;

connectDb()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}) 
.catch((err) => {
  console.log(`Connection failed, ${err}`);
  process.exit(1);
});