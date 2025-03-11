import express from "express";
import routerAuth from "./auth.js";
import routerProject from "./projectRoute.js";
import routeIssues from "./issuesRoute.js";
const router = express.Router();

router.use('/auth', routerAuth);
router.use('/project', routerProject);
router.use('/issue', routeIssues);

export default router;