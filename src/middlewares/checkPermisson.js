import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

export const checkPermission = async (req, res, next) => {
  try {

    const token = req.headers.authorization.split(" ")(1);

    if (token)
      return res.status(403).json({
        message: "Bạn chưa đăng nhập",
      });


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(403).json({
        message: "Token không hợp lệ",
      });
    }

    if (user.role != "ADMIN") {
      return res.status(403).json({
        message: "Bạn không có quyền làm việc này",
      });
    }

    next();
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
