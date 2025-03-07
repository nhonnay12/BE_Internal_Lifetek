import express, { Router } from "express";
import { create, getAll, getDetail, remove, update } from '../controllers/product.js';
import { checkPermission } from "../middlewares/checkPermisson.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getDetail);
router.post("/", checkPermission, create);
router.put("/:id", checkPermission,  update);
router.delete("/:id", checkPermission,  remove);

export default router;