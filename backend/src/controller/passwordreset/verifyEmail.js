import jwt from "jsonwebtoken";
import { userModel } from "../../models/user.scheme.js";
import bcrypt from "bcrypt";

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const { email, resetPassword } = jwt.verify(
      token,
      "Email-verify-secret-djisojasoiijd"
    );

    res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
            </head>
            <body>
                <h1>Email reset successful</h1>
            </body>
            </html>
        `);

    const hashedPassword = await bcrypt.hash(resetPassword, 10);
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.password = hashedPassword;
    await user.save();
  } catch (err) {
    console.log(err);
    res.json({
      message: "failed",
    });
  }
};
