import express from "express";
import { verifyEmail } from "../controller/passwordreset/verifyEmail.js";
import { sendPasswordResetEmail } from "../controller/passwordreset/passwordreset.js";


export const passwordRouter = express.Router();

passwordRouter.post("/", sendPasswordResetEmail);
passwordRouter.get("/verify", verifyEmail);
