import User from "../models/User.js";

export const getUserById = async (id) => {
    return await User.findById(id);
}

export const getAllUser = async () => {
    return await User.find();
}