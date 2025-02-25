
dotenv.config();
import dotenv from 'dotenv';
import express from 'express';
import { userRouter } from './routes/user-router.js';
import { connectToDatabase } from './database/index.js';
import { foodRouter } from './routes/food-router.js';


const app = express();
const PORT = 9000;

connectToDatabase();
app.use(express.json());


app.use('/users', userRouter);
app.use('/foods', foodRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
