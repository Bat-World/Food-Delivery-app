import { categoryModel } from "../../models/foodCategory.scheme.js";

const getCategories = async (req, res) => {
  try {
    const foods = await categoryModel.find();
    res.json(foods);
  } catch (error) {}
};

export default getCategories;
