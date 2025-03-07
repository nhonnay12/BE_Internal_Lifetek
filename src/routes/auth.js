import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.js";

const routerAuth = Router();

routerAuth.post("/signup", signUp);
routerAuth.post("/signIn", signIn);
routerAuth.get("/", (res, req) => {
  req.send("Hello");
});

export default routerAuth;
