import bcrypt from "bcryptjs";
import { userModel } from "../../models/user.scheme.js";

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

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};
