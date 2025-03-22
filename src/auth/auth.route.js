import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import * as authController from "./auth.controller.js";

const routerAuth = Router();

routerAuth.post("/register", authController.register);
routerAuth.get("/verify-email/:token", authController.verifyEmail);
routerAuth.post("/login", authController.login);
routerAuth.post("/logout", authMiddleware, authController.logout);
routerAuth.post("/refresh-token", authController.getNewAccessToken);
routerAuth.post("/forgot-password", authController.forgotPassword);
routerAuth.post("/reset-password/:id", authController.resetPassword);

export default routerAuth;