import mongoose from 'mongoose';
import { userModel } from "../../models/user.scheme.js";

export const updateUser = async (req, res) => {
  const { id } = req.params; 
  const { password } = req.body; 


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { password },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser); 
  } catch (err) {
    return res.status(500).json({ message: "Error updating user", error: err });
  }
};
