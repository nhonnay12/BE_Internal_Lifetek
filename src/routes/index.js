import express from "express";
import routerAuth from "../auth/auth.route.js";
import routerProject from "../projects/project.route.js";
import routerTask from "../tasks/task.route.js";
import routerCmt from "../comments/comment.route.js";
import routeUser from "../users/user.route.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.use("/auth", routerAuth);

const routes = {
    "/projects": routerProject,
    "/tasks": routerTask,
    "/comments": routerCmt,
    "/user": routeUser,
};

Object.entries(routes).forEach(([path, rou]) => {    
    router.use(path, authMiddleware, rou);
});

export default router;