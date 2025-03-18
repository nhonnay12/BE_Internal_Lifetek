import express from "express";
import { addComment } from "../controllers/commentController.js";
// import { validateComment } from "../middlewares/validate.js";

const routerCmt = express.Router();

// add comment
routerCmt.post("/add-comment/:projectId/:taskId", addComment);

export default routerCmt;
