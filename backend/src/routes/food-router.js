import { Router } from "express";
import { createFood } from "../controller/foods/create-food.js";

export const foodRouter = Router();

foodRouter.post("/", createFood);