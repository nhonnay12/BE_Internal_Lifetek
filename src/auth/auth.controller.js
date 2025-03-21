import User from "../users/user.model.js";
import * as authValidation from "./auth.validation.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import env from "../config/env.js"
import * as tokenUtils from "../utils/tokenUtils.js";
import * as emailTemplate from "../services/templateService.js";
import * as emailQueue from "../queues/index.js";
import * as passwordUtils from "../utils/generatePassword.js";
import SuccessResponse from "../utils/SuccessResponse.js";
dotenv.config();

//đăng ký
export const signUp = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = authValidation.signUpValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({
                message: "Email nay da duoc dang kt ban co muon dang nhap khong",
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        const verifyToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30m",
        });

        //gui email
        const verificationLink = `${process.env.BASE_URL}/api/v1/auth/verify-email/${verifyToken}`;
        const emailContent = emailTemplate.getVerificationEmailTemplate(verificationLink);

        // use service send email
        // sendMail({
        //   to: user.email,
        //   subject: "Xác thực email",
        //   text: "Xác thực email",
        //   html: emailContent,
        // })

        // use worker send email
        await emailQueue.emailQueue.add("sendEmail", {
            email: user.email,
            subject: "Xác thực email",
            text: "Xác thực emailabc",
            html: emailContent,
        });

        user.password = undefined;

        new SuccessResponse(user).send(res);
    } catch (error) {
        next(error);
    }
};
//xác thực email
export const verifyEmail = async (req, res) => {

    try {
        const { token } = req.params;
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({
                message: "Token khong hop le",
            });
        }

        const user = await User.findById(decode.id);
        if (!user) {
            return res.status(404).json({
                message: "User khong ton tai",
            });
        }

        user.verified = true;
        await user.save();

        return res.status(200).json({
            message: "Xac thuc email thanh cong",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
//đăng nhập
export const signIn = async (req, res, next) => {
    try {
        //validate
        const { error } = authValidation.signInValidator.validate(req.body, { abortEarly: false })
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

        if (!user.verified) {
            return res.status(401).json({
                message: "Email chua duoc xac thuc"
            })
        }

        // tao token
        const accessToken = tokenUtils.generateAccessToken(user)
        const refreshToken = tokenUtils.generateRefreshToken(user)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, //local
            sameSite: "strict",
        });

        user.password = undefined;

        new SuccessResponse({
            accessToken: accessToken,
            tokenExpiry: env.JWT_ACCESS_EXPIRY,
            user: user
        }).send(res);
    } catch (error) {
        next(error);
    }
}
//làm mới token
export const getNewAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Ban chua dang nhap",
        });
    }

    try {
        const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        if (!decode) {
            return res.status(401).json({
                message: "Token khong hop le",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
//đăng xuất
export const signOut = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}
// gửi mail mat khau mới
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) res.status(404).json({ message: "Email chua dang ky" });

        const newPassword = passwordUtils.generateRandomPassword(10);
        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        const contextMail = emailTemplate.getResetPasswordEmailTemplate(newPassword);

        await emailQueue.emailQueue.add("sendEmail", {
            email: user.email,
            subject: "Cấp lại mật khẩu",
            text: `Mat khau moi cua ban la ${newPassword}`,
            html: contextMail,
        });

        return res.status(200).json({
            message: "Vui long kiem tra email de lay mat khau moi"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
//  đặt lại mật khẩu bằng
export const resetPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User khong ton tai"
            });
        };

        const isMatch = await bcryptjs.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Mat khau cu khong dung"
            });
        };

        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            message: "Cap nhat mat khau thanh cong"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}