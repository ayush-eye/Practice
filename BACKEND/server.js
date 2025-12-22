import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;

// Example route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Backend sdhgvjgvkj👋' });
});

app.get('/', (req, res) => {
  res.json('Hello from Backend 👋');
});

app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
