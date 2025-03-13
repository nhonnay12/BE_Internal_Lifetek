import express from "express";
import { addComment } from "../controllers/commentController.js";
import { validateComment } from "../middlewares/validate.js";

const router = express.Router();

// add comment
router.post(
  "/projects/:projectId/tasks/:taskId/comments",
  validateComment,
  addComment
);

export default router;
