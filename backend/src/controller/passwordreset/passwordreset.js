import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "nomnomfoods837@gmail.com",
    pass: "lxzixjntnnqekmnp",
  },
});

export const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const resetLink = `http://localhost:3002/?email=${email}`;


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
