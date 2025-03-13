import { Router } from "express";
import { createUser } from "../controller/users/create-user.js";
import { deleteUser } from "../controller/users/delete-user.js";
import { updateUser } from "../controller/users/update-user.js";
import { Authorization } from "../middleware/authorization.js";
import { getUser } from "../controller/users/get-users.js";

export const userRouter = Router();

userRouter.delete("/", Authorization, deleteUser);
userRouter.get("/", Authorization, getUser);
userRouter.post("/signup", createUser);
userRouter.put("/:id", updateUser);
