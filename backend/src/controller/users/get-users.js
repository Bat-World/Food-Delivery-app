import { userModel } from "../../models/user.scheme.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find(); // Get all users
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
