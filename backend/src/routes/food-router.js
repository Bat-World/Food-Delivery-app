import { Router } from "express";
import { createFood } from "../controller/foods/create-food.js";
import { getAllFood } from "../controller/foods/get-food.js";
import { createCategory } from "../controller/catergories/create-category.js";
import { createItem } from "../controller/Items/create-item.js";
export const foodRouter = Router();

foodRouter.post("/", createFood);
foodRouter.get("/", getAllFood);
foodRouter.post("/category", createCategory);
foodRouter.post("/order", createItem);