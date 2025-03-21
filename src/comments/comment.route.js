import express from "express";
import * as commentController from "./comment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const routerCmt = express.Router();

// add comment
routerCmt.post("/add-comment/:taskId", authMiddleware, commentController.addComment);
routerCmt.get("/get-comments/:taskId", authMiddleware, commentController.getAllComments);
export default routerCmt;
