import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { userModel } from "../../models/user.scheme.js";

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

   
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );


    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user (excluding the password for security)
    const userWithoutPassword = updatedUser.toObject();
    delete userWithoutPassword.password;
    return res.status(200).json(userWithoutPassword);
  } catch (err) {
    return res.status(500).json({ message: "Error updating user", error: err });
  }
};