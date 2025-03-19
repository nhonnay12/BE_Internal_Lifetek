import express from "express";
import {
  addComment,
  getAllComments,
} from "../controllers/commentController.js";
import authMiddleware from "../middlewares/auth.js";

const routerCmt = express.Router();

// add comment
routerCmt.post("/add-comment/:taskId", addComment);
routerCmt.get("/get-comments/:taskId", authMiddleware, getAllComments);
export default routerCmt;
