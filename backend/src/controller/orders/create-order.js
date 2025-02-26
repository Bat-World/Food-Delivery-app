
import foodOrderModel from "../../models/foodOrder.scheme.js";
import { userModel } from "../../models/user.scheme.js";


export const createOrder = async (req, res) => { 
    try {
        const { orderItems, totalPrice, status, user, foodOrderItems } = req.body;
        const newOrder = await foodOrderModel.create({
            foodOrderItems,
            orderItems,
            totalPrice,
            status,
            user,
        });
        const userData = await userModel.findById(user);
        console.log(newOrder);
        
        // const updatedUser = {...userData, orderedFoods: [...userData.orderedFoods, newOrder._id]}

        await userModel.findOneAndUpdate({_id:user}, {orderedFoods: [...userData.orderedFoods, newOrder._id]})

        res.status(201).json({
            message: "Order created successfully!",
            order: newOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create order", error });
    }
};