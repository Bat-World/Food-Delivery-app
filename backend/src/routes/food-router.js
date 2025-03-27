import { Router } from "express";
import { createFood } from "../controller/foods/create-food.js";
import { getAllFood } from "../controller/foods/get-food.js";
import { createCategory } from "../controller/catergories/create-category.js";
import { createOrder } from "../controller/orders/create-order.js";
import getOderById from "../controller/orders/get-order.js";
import getCategories from "../controller/catergories/get-categroy.js";
import { getAllOrders } from "../controller/orders/get-order.js";
import { updateFood } from "../controller/foods/update-food.js";
import { Authorization } from "../middleware/authorization.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import deleteFood from "../controller/foods/delete-food.js";

export const foodRouter = Router();

foodRouter.post("/", Authorization, checkAdmin, createFood);
foodRouter.get("/", getAllFood);
foodRouter.post("/category", checkAdmin, createCategory);
foodRouter.post("/order", createOrder);
foodRouter.get("/order/:id", getOderById);
foodRouter.get("/category", getCategories);
foodRouter.get("/orders", checkAdmin, getAllOrders);
foodRouter.put("/update/:id", checkAdmin,  updateFood);
foodRouter.delete("/delete/:id", checkAdmin, deleteFood);
