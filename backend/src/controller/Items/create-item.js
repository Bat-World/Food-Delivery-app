// import { foodOrderItemModel } from "../../models/foodOrderItem.scheme.js"; 

// export const createItem = async (req, res) => {
//     try {
//         const { food, quantity } = req.body;

        
//         const newOrderItem = new foodOrderItemModel({
//             food,      
//             quantity,  
//         });
     
//         const savedOrderItem = await newOrderItem.save();

//         res.status(201).json({
//             message: "Order item created successfully!",
//             orderItem: savedOrderItem
//         });
      
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Failed to create food item", error });
//     }
// };
