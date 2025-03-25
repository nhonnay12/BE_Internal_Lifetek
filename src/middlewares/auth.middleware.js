import jwt from "jsonwebtoken";
import User from "../users/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return next(new Error("Không tìm thấy token"));

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return next(new Error("Không tìm thấy token"));

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id).select("-password");

    if (!req.user) return next(new Error("Không tìm thấy user"));

    next();
  } catch (error) {
    return next(error);
  }
};

export default authMiddleware;
