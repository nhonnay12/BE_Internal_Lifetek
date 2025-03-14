import jwt from "jsonwebtoken";
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Ban chua dang nhap abc " + token
            });
        };

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id);

        if (!req.user) {
            return res.status(404).json({
                message: "User khong ton tai"
            });
        };

        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export default authMiddleware