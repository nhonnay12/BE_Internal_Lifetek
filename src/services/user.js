import User from "../models/User.js";

export const getAllUser = async () => {
    return await User.find();
}