import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateAccessToken = (user) => {
    return jwt.sign({
        id: user._id,
        role: user.role
    },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRY }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRY }
    )
}

export { generateAccessToken, generateRefreshToken }