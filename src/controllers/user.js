import * as userService  from "../services/user.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}