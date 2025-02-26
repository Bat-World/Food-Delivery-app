import { Router } from "express";
import { createFood } from "../controller/foods/create-food.js";
import { getAllFood } from "../controller/foods/get-food.js";
import { createCategory } from "../controller/catergories/create-category.js";
import { createItem } from "../controller/Items/create-item.js";
import { createOrder } from "../controller/orders/create-order.js";
import { getAllOrders} from "../controller/orders/get-order.js";
export const foodRouter = Router();

foodRouter.post("/", createFood);
foodRouter.get("/", getAllFood);
foodRouter.post("/category", createCategory);
foodRouter.post("/item", createItem);
foodRouter.post("/order", createOrder);
foodRouter.get("/orders", getAllOrders);