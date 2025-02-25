import foodModel from "../../models/food.scheme.js";

export const createFood = async (req, res) => {
  try {
    const { name, price, image, ingredients, category } = req.body;

    const newFood = new foodModel({
      name,
      price,
      image,
      ingredients,
      category,
    });

    const savedFood = await newFood.save();

    
    res.status(201).json({
      message: "Food item created successfully!",
      food: savedFood,
    });
  } catch (error) {
  
    console.error(error);
    res.status(500).json({ message: "Failed to create food item", error });
  }
};
