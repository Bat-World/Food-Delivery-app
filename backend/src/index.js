import express from 'express';
import dotenv from 'dotenv';  
import cors from 'cors'; 
import { userRouter } from './routes/user-router.js';
import { foodRouter } from './routes/food-router.js';
import { loginRouter } from './routes/login-router.js';
import { connectToDatabase } from './database/index.js';
import {passwordRouter} from './routes/password-routes.js';

dotenv.config(); 

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})
connectToDatabase();

app.use('/passwordreset', passwordRouter);
app.use('/user', userRouter);
app.use('/food', foodRouter);
app.use('/login', loginRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;