import express from "express";
import routerAuth from "./auth.js";
import routerProject from "./projectRoute.js";
import routerTask from "./taskRouter.js";
import routerUser from "./user.js";
const router = express.Router();

router.use("/auth", routerAuth);
router.use("/projects", routerProject);
router.use("/tasks", routerTask);
router.use("/users", routerUser);
export default router;
