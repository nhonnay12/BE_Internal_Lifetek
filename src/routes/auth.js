import { Router } from "express";
import { getNewAccessToken, signIn, signOut, signUp } from "../controllers/auth.js";
import authMiddleware from "../middlewares/auth.js";

const routerAuth = Router();

routerAuth.post("/sign-up", signUp);
routerAuth.post("/sign-in", signIn);
routerAuth.post("/sign-out", authMiddleware, signOut)
routerAuth.post("/refresh-token", getNewAccessToken);

export default routerAuth;
