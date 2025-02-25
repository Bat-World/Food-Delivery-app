import { userModel } from "../../models/user.scheme.js";

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
