import foodOrderModel from "../../models/foodOrder.scheme.js";

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await foodOrderModel
      .findById(orderId)
      .populate("user", "orderedFoods");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve order", error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await foodOrderModel
      .find()
      .populate("user", "name email orderedFoods");

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve orders", error });
  }
};

export default getOrderById;
