import foodModel from "../../models/food.scheme.js";

export const getAllFood = async (req, res) => {
  try {
    const foods = await foodModel.find().populate("category");
    res.json(foods);
  } catch (error) {}
};
