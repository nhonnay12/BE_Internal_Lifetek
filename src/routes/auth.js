import { Router } from "express";
import { forgotPassword, getNewAccessToken, resetPassword, signIn, signOut, signUp, verifyEmail } from "../controllers/auth.js";
import authMiddleware from "../middlewares/auth.js";

const routerAuth = Router();

routerAuth.post("/sign-up", signUp);
routerAuth.get("/verify-email/:token", verifyEmail);
routerAuth.post("/sign-in", signIn);
routerAuth.post("/sign-out", authMiddleware, signOut);
routerAuth.post("/refresh-token", getNewAccessToken);
routerAuth.post("/forget-password", forgotPassword);
routerAuth.post("/reset-password/:id", resetPassword);

export default routerAuth;