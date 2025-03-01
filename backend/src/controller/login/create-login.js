import { userModel } from "../../models/user.scheme.js";
import bcrypt from 'bcryptjs';  
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY

const createLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email });
        var token = jwt.sign({email,}, secretKey);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }


        return res.status(200).json({
            message: "Login successful",
            token: token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export default createLogin;
