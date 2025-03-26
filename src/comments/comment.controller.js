

import * as commentService from "./comment.service.js";
import * as taskService from "../tasks/task.service.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import PAGINATE from "../constants/paginate.js";

export const addComment = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { content, taskId } = req.body; // Lấy content từ request body

    const comment = await commentService.createComment({
      taskId,
      userId,
      content,
    });
    return new SuccessResponse(comment).send(res);
  } catch (error) {
    next(error);
  }
};
export const getAllComments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || PAGINATE.PAGE;
    const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
    const skip = (page - 1) * limit;
    const taskId = req.task._id;
    const comments = await commentService.getAllcmt(taskId, skip, limit);
    const total = await commentService.countComment(taskId);

    return new SuccessResponse(
      comments,
      200,
      "success",
      total,
      page,
      limit
    ).sends(res);
  } catch (error) {
    next(error);
  }
};
export const load = async (req, res, next, id) => {
  try {
    const task = await taskService.getTaskById(id);
    if (!task) {
      next(new Error("Task not found"));
    }
    req.task = task;
    next();
  } catch (error) {
    next(error);
  }
};
