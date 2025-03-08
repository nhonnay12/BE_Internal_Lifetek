import User from '../models/User.js';
import { signInValidator, signUpValidator } from '../validation/user.js';
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';
dotenv.config();

//đăng ký
export const signUp = async (req, res) => {
    try {
        const { error } = signUpValidator.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors
            })
        }

        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(400).json({
                message: "Email nay da duoc dang kt ban co muon dang nhap khong"
            })
        }

        const hashedPassword = await bcryptjs.hash(req.body.password, 10)

        const user = await User.create({
            ...req.body,
            password: hashedPassword
        })

        user.password = undefined;

        return res.status(200).json({
            message: "Dang ký account thanh cong!",
            user,
        })
    } catch (error) {
        return res.status(500).json({
            name: error.message,
            message: error.message
        })
    }
}
//đăng nhập
export const signIn = async (req, res) => {
    try {
        //validate
        const { error } = signInValidator.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors
            })
        }

        const { email, password } = req.body;

        // truy van user
        const user = await User.findOne({ email });

        // kiem tra user
        if (!user) {
            return res.status(404).json({
                message: "Emai nay chua dang ky ban co muon dang ky khong"
            })
        }

        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({
                message: "Mat khau khong dung"
            })
        }

        // tao token
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, //local
            sameSite: "strict",
        });

        return res.status(200).json({
            message: "Dang nhap thanh cong",
            accessToken,
            user
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
//làm mới token
export const getNewAccessToken = async (req, res) => {
     const refreshToken = req.cookies.refreshToken; 

    if (!refreshToken) {
        return res.status(401).json({
            message: "Ban chua dang nhap"
        });
    };

    try {
        const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        if (!decode) {
            return res.status(401).json({
                message: "Token khong hop le"
            });
        };

        const user = await User.findById(decode.id);

        if (!user) {
            return res.status(404).json({
                message: "User khong ton tai"
            });
        };

        const newAccessToken = generateAccessToken(user);

        return res.status(200).json({
            message: "Tao token thanh cong",
            accessToken: newAccessToken,
            user
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
//đăng xuất
export const signOut = async (req, res) => {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({
            message: "User khong ton tai"
        });
    };

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false, // local 
        sameSite: "strict",
    });
    return res.status(200).json({
        message: "Dang xuat thanh cong"
    });
}