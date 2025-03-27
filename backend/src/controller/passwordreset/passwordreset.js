import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'


dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "nomnomfoods837@gmail.com",
    pass: "lxzixjntnnqekmnp",
  },
});

export const sendPasswordResetEmail = async (req, res) => {
  const { email, resetPassword } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const token = jwt.sign({ email, resetPassword }, "Email-verify-secret-djisojasoiijd")

  const resetLink = `https://food-delivery-bakcend.vercel.app/passwordreset/verify?token=${token}}`;

  const mailOptions = {
    from: `" Food" ${process.env.EMAIL_USER}`,
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click this link to reset your password: ${resetLink}</p>`,
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
