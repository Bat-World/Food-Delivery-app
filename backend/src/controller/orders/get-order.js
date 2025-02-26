import foodOrderModel from "../../models/foodOrder.scheme.js";

export const getAllOrders = async (req, res) => {
try{
    const orders = await foodOrderModel.find().populate("user");
    req.Json(orders);
}
catch(error){}

}