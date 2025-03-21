import Comment from "./comment.model.js";

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
export const getAllcmt = async (taskId) => {
  try {
    const comments = await Comment.find({ taskId: taskId });
    return comments;
  } catch (error) {
    console.error("Lỗi khi lấy bình luận:", error.message);
    throw new Error("Không thể lấy bình luận. Vui lòng thử lại.");
  }
};
