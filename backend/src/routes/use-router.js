
import { Router } from "express";
import { createUser } from "../controller/users/create-user.js";

export const userRouter = Router();

userRouter.post("/", createUser);

