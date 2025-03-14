import express from "express";
import routerAuth from "./auth.js";
import routerProject from "./projectRoute.js";
import routerTask from "./taskRouter.js";
const router = express.Router();

router.use("/auth", routerAuth);
router.use("/projects", routerProject);
router.use("/tasks", routerTask);

export default router;
