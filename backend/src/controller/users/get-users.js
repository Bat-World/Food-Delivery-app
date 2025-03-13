import { userModel } from "../../models/user.scheme.js";
import jwt from "jsonwebtoken";
import dotenv, { populate } from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId).populate([
      "orderedFoods",
      {
        path: "orderedFoods",
        populate: { path: "foodOrderItems", populate: "food" },
      },
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export const getUserByToken = async (req, res) => {
//   try {
//     const { authorization } = req.headers;
//     const token = authorization.split(" ")[1];

//     const decoded = jwt.verify(token, secretKey);
//     // console.log(decoded);

//     if (!decoded) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(decoded.user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
