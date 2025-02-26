import { userModel } from "../../models/user.scheme.js";

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel
            .findById(userId)
            .populate("orderedFoods")
         
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
