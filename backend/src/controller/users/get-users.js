import { userModel } from "../../models/user.scheme.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;
console.log(secretKey);

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId).populate("orderedFoods");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserByToken = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);

    if (!decoded) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(decoded.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
