import express from "express";

const app = express();
export { app };

app.use(express.json());

app.get("/", (req, res) => {
    res.send("App Running 🚀");
});