import Comment from "../models/comment.js";

export const createComment = async (data) => {
  try {
    if (!data.projectId || !data.taskId || !data.userId || !data.content) {
      throw new Error("Thiếu dữ liệu bắt buộc");
    }
    const comment = await Comment.create(data);
    return comment;
  } catch (error) {
    console.error("Lỗi khi tạo bình luận:", error.message);
    throw new Error("Không thể tạo bình luận. Vui lòng thử lại.");
  }
};
