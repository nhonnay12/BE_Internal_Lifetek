import * as commentService from "../services/commentService.js";

export const addComment = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const { userId } = req.body;
    const { content } = req.body; // Lấy content từ request body

    const comment = await commentService.createComment({
      projectId,
      taskId,
      userId,
      content,
    });
    res
      .status(201)
      .json({ message: "Thêm bình luận thành công", comment: comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
