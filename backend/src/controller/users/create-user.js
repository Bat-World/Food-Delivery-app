import { userModel } from "../../models/user.scheme.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body; 

    const salt = await bcrypt.genSalt(10);


    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      ...rest,
      password: hashedPassword, 
    });


    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};
