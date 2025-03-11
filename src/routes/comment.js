import express from "express";
import { addComment } from "../controllers/commentController.js";
import { validateComment } from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/projects/:projectId/tasks/:taskId/issues/:issueId/comments",
  validateComment,
  addComment
);

export default router;
