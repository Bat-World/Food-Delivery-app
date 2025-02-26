
import foodOrderModel from "../../models/foodOrder.scheme.js";


export const createOrder = async (req, res) => { 
    try {
        const { orderItems, totalPrice, status, user, foodOrderItems } = req.body;
        const newOrder = new foodOrderModel({
            foodOrderItems,
            orderItems,
            totalPrice,
            status,
            user,
        });
        const savedOrder = await newOrder.save();
        res.status(201).json({
            message: "Order created successfully!",
            order: savedOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create order", error });
    }
};