
import { Router } from "express";
import { getUser } from "../controller/users/get-users.js";
import { createUser } from "../controller/users/create-user.js";
import { deleteUser } from "../controller/users/delete-user.js";
import { updateUser } from "../controller/users/update-user.js";


export const userRouter = Router();

userRouter.post("/", createUser)
userRouter.delete("/", deleteUser);
userRouter.get("/:id", getUser);
userRouter.put('/:id', updateUser);

