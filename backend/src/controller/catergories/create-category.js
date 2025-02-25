import { categoryModel } from "../../models/foodCategory.scheme.js";

export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const newCategory = new categoryModel({
      categoryName,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      message: "Category created successfully!",
      category: savedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create category", error });
  }
};
