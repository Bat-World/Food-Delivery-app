import express from "express";
import { sendPasswordResetEmail } from "../controller/passwordreset/passwordreset.js";
import { verifyEmail } from "../controller/passwordreset/verifyEmail.js";

export const passwordRouter = express.Router();

passwordRouter.post("/", sendPasswordResetEmail);
passwordRouter.get("/verify", verifyEmail);
