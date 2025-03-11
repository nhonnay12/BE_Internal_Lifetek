import express from "express";
import routerAuth from "./auth.js";
import routerTask from './taskRoute.js'
const router = express.Router();

router.use('/auth', routerAuth );
router.use('/task',routerTask)
export default router;