import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { userModel } from "../../models/user.scheme.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nomnomfoods837@gmail.com",
    pass: "lxzixjntnnqekmnp",
  },
});

export const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const resetLink = `http://localhost:9000/user/${id}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
};
