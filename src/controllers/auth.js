import User from "../models/User.js";
import { signInValidator, signUpValidator } from "../validation/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenUtils.js";
import {
  getResetPasswordEmailTemplate,
  getVerificationEmailTemplate,
} from "../services/templateService.js";
import { emailQueue } from "../queues/index.js";
import { generateRandomPassword } from "../utils/generatePassword.js";
dotenv.config();

//đăng ký
export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });
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
    const emailContent = getVerificationEmailTemplate(verificationLink);

    //send email

    // use worker send email
    await emailQueue.add("sendEmail", {
      email: user.email,
      subject: "Xác thực email",
      text: "Xác thực emailabc",
      html: emailContent,
    });

    user.password = undefined;

    return res.status(200).json({
      message:
        "Dang ký account thanh cong! Vui long kiem tra email de xac thuc",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.message,
      message: error.message,
    });
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
      message: `Token khong hop le hoac het han ${error.message}`,
    });
  }
};
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

        if (!user.verified) {
            return res.status(401).json({
                message: "Email chua duoc xac thuc"
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

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Mat khau khong dung",
      });
    }

    if (!user.verified) {
      return res.status(401).json({
        message: "Email chua duoc xac thuc",
      });
    }

    // tao token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //local
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Dang nhap thanh cong",
      accessToken,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
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

    const newPassword = generateRandomPassword(10);
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    const contextMail = getResetPasswordEmailTemplate(newPassword);

    await emailQueue.add("sendEmail", {
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