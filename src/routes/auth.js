import { Router } from "express";
import { forgotPassword, getNewAccessToken, resetPassword, signIn, signOut, signUp, verifyEmail } from "../controllers/auth.js";
import authMiddleware from "../middlewares/auth.js";

const routerAuth = Router();

routerAuth.post("/signup", signUp);
routerAuth.post("/signIn", signIn);
routerAuth.get("/", (res, req) => {
  req.send("Hello");
});

export default routerAuth;