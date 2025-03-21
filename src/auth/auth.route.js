import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import * as authController from "./auth.controller.js";

const routerAuth = Router();

routerAuth.post("/sign-up", authController.signUp);
routerAuth.get("/verify-email/:token", authController.verifyEmail);
routerAuth.post("/sign-in", authController.signIn);
routerAuth.post("/sign-out", authMiddleware, authController.signOut);
routerAuth.post("/refresh-token", authController.getNewAccessToken);
routerAuth.post("/forgot-password", authController.forgotPassword);
routerAuth.post("/reset-password/:id", authController.resetPassword);

export default routerAuth;