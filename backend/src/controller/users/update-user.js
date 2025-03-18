import mongoose from "mongoose";
import { userModel } from "../../models/user.scheme.js";

// export const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { role } = req.body;

//   if (!role || !["user", "admin"].includes(role)) {
//     return res.status(400).json({
//       message: "Invalid role provided. It must be 'user' or 'admin'.",
//     });
//   }

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid user ID format" });
//   }

//   try {
//     const updatedUser = await userModel.findByIdAndUpdate(
//       id,
//       { role },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const userWithoutPassword = updatedUser.toObject();
//     delete userWithoutPassword.password;
//     return res.status(200).json({
//       message: "User role updated successfully",
//       user: userWithoutPassword,
//     });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Error updating user role", error: err });
//   }
// };å
// password reset


export const resetPassword = async (req, res) => {
  const { email } = req.query; 
  const { password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and new password are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

