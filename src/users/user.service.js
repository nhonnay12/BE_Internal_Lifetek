import User from "./user.model.js";

export const getUserById = async (id) => {
    return await User.findById(id);
}

export const getAllUser = async (skip, limit) => {
    return await User.find().skip(skip).limit(limit);
}

export const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, {
        new: true
    });
}

export const countUser = async () => {
    return await User.countDocuments();
}