import { uploadSingleFile } from "../services/cloudinaryService.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import * as userService from "./user.service.js";

export const getUserById = async (req, res) => {
    const id = req.user._id;
    try {
        const user = await userService.getUserById(id);
        user.password = undefined;
        new SuccessResponse(user).send(res);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const users = await userService.getAllUser(skip, limit);
        const total = await userService.countUser();

        new SuccessResponse(users, 200, 'success',   total, page, limit ).sends(res);
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

export const load = async (req, res, next, id) => {
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            next(new Error("Không tìm thấy người dùng"));
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}