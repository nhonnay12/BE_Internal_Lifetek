import express from "express";
import routerAuth from "./auth.js";
import routerProject from "./projectRoute.js";
import routerTask from "./taskRouter.js";
import routerCmt from "./commentRouter.js";
import routeUser from "./user.js";
import authMiddleware from "../middlewares/auth.js";
const router = express.Router();

router.use("/auth", routerAuth);

const routes = {
    "/projects": routerProject,
    "/tasks": routerTask,
    "/comments": routerCmt,
    "/user": routeUser, 
};


router.use(authMiddleware);
Object.entries(routes).forEach(([path, rou]) => {    
    router.use(path, rou);
});

export default router;