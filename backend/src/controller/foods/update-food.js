import mongoose from "mongoose";
import foodModel from "../../models/food.scheme.js";

export const updateFood = async (req, res) => {
  const { id } = req.params;
  const { image, name  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Food ID" });
  }

  try {
    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { image, name},
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }

    console.log("Updated Food:", updatedFood);
    res.status(200).json(updatedFood);
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ message: "Server error" });
  }
};
