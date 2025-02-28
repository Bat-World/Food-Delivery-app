
import express from 'express';
import { sendPasswordResetEmail } from '../controller/passwordreset/passwordreset.js';

export const passwordRouter = express.Router();


passwordRouter.post('/', sendPasswordResetEmail);


