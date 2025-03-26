import Comment from "./comment.model.js";

export const createComment = async (data) => {
  try {
    if (!data.taskId || !data.userId || !data.content) {
      throw new Error("Thiếu dữ liệu bắt buộc");
    }
    const comment = await Comment.create(data);
    return comment;
  } catch (error) {
    throw new Error("Không thể tạo bình luận. Vui lòng thử lại." + error.message);
  }
};
export const getAllcmt = async (taskId, skip, limit) => {
  try {
    const comments = await Comment.find({ taskId: taskId }).skip(skip).limit(limit);
    return comments;
  } catch (error) {
    throw new Error("Không thể lấy bình luận. Vui lòng thử lại." + error.message);
  }
};
export const countComment = async (taskId) => {
  try {
    const total = await Comment.countDocuments({ taskId: taskId });
    return total;
  }
  catch (error) {
    throw new Error("Không thể đếm bình luận. Vui lòng thử lại." + error.message);
  }
};