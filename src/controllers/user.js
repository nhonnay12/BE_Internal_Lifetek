import { uploadSingleFile } from "../services/cloudinaryService.js";
import * as userService from "../services/user.js";

export const getProfile = async (req, res) => {
    const id = req.user._id;
    try {
        const user = await userService.getUserById(id);
        return res.status(200).json({
            message: "Lấy thông tin người dùng thành công",
            data: {
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                role: user.role,
                verified: user.verified,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateUser = async (req, res) => {
    try {
        const id = req.user._id;
        if (req.file) {
            const filePath = req.file.buffer;
            const imageUrl = await uploadSingleFile(filePath);
            req.body.avatar = imageUrl.secure_url;
        };

        const user = await userService.updateUser(id, req.body);
        return res.status(200).json({
            message: "Cập nhật thông tin thành công",
            data: {
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                role: user.role,
                verified: user.verified,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}