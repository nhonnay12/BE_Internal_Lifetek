import express from "express";
import routerAuth from "./auth.js";
import routerProject from "./projectRoute.js";
const router = express.Router();

router.use('/auth', routerAuth);
router.use('/project', routerProject);

export default router;