import { userModel } from "../../models/user.scheme.js";

export const createUser = async (req, res) => {
    const newUser = await userModel.create(req.body);
    res.json(newUser);
}