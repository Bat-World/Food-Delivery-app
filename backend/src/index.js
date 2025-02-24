import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectToDatabase } from './database/index.js';
import { userRouter } from './routes/use-router.js';

const app = express();
const PORT = 3000;

connectToDatabase();

app.use(express.json());

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
