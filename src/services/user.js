import User from "../models/User.js";

export const getUserById = async (id) => {
    return await User.findById(id);
}

export const getAllUser = async () => {
    return await User.find();
}

export const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, {
        new: true
    });
}