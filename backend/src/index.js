
dotenv.config();
import dotenv from 'dotenv';
import express from 'express';
import { userRouter } from './routes/user-router.js';
import { connectToDatabase } from './database/index.js';
import { foodRouter } from './routes/food-router.js';
import { loginRouter } from './routes/login-router.js';


const app = express();
const PORT = 9000;

connectToDatabase();
app.use(express.json());


app.use('/user', userRouter);
app.use('/food', foodRouter);
app.use('/login', loginRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
