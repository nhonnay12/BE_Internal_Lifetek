import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.js";

const routerAuth = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API xác thực người dùng
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     description: Tạo tài khoản người dùng với email và mật khẩu.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi đầu vào không hợp lệ
 */
routerAuth.post("/signup", signUp);
/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Đăng nhập người dùng
 *     description: Xác thực người dùng với email và mật khẩu.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về token
 *       401:
 *         description: Sai email hoặc mật khẩu
 */
routerAuth.post("/signIn", signIn);
routerAuth.get("/", (res, req) => {
  req.send("Hello");
});

export default routerAuth;
