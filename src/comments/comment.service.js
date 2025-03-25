import Comment from "./comment.model.js";
import mongoose from "mongoose";
import Task from "../tasks/task.model.js";
export const createComment = async (data) => {
  try {
    if (!data.taskId || !data.userId || !data.content) {
      throw new Error("Thiếu dữ liệu bắt buộc");
    }
    const comment = await Comment.create(data);
    return comment;
  } catch (error) {
    console.error("Lỗi khi tạo bình luận:", error.message);
    throw new Error("Không thể tạo bình luận. Vui lòng thử lại." + data.taskId);
  }
};
export const getAllcmt = async (taskId, skip, limit) => {
  try {
    const comments = await Comment.find({ taskId: taskId })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "userId",
        select: "userName avatar ",
      });
    return comments;
  } catch (error) {
    console.error("Lỗi khi lấy bình luận:", error.message);
    throw new Error("Không thể lấy bình luận. Vui lòng thử lại.");
  }
};
export const countComment = async (taskId) => {
  try {
    const total = await Comment.countDocuments({ taskId: taskId });
    return total;
  } catch (error) {
    throw new Error("Không thể đếm bình luận. Vui lòng thử lại.");
  }
};
