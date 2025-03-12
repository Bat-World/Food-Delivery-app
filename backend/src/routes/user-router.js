import { Router } from "express";
import { getUser } from "../controller/users/get-users.js";
import { createUser } from "../controller/users/create-user.js";
import { deleteUser } from "../controller/users/delete-user.js";
import { updateUser } from "../controller/users/update-user.js";
import { Authorization } from "../middleware/authorization.js";

export const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.delete("/", Authorization, deleteUser);
userRouter.get("/", Authorization, getUser);
// userRouter.get("/", getUserByToken);
userRouter.put("/:id", updateUser);
