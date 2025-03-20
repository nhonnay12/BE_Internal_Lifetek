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
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Project from "../models/Project.js";

dotenv.config();
const { SECRET_CODE } = process.env;


/**
 * Middleware kiểm tra quyền admin
 */
const checkIsAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Bạn không có quyền làm việc này" });
    }
    next();
};

/**
 * Middleware kiểm tra người dùng có phải manager hoặc member của dự án không
 */
const checkIsProjectMember = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Dự án không tồn tại" });
        }

        const userId = req.user._id.toString();
        const isManager = project.managerId.toString() === userId;
        const isMember = project.members.some(member => member.toString() === userId);

        if (!isManager && !isMember && req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Bạn không có quyền truy cập dự án này" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

export { authenticateToken, checkIsAdmin, checkIsProjectMember };
