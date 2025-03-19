import * as commentService from "../services/commentService.js";

export const addComment = async (req, res) => {
  try {
    // return res.status(200).json({ message: req.user });
    const { taskId } = req.params;
    const userId = req.user._id;
    const { content } = req.body; // Lấy content từ request body

    const comment = await commentService.createComment({
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
export const getAllComments = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const comments = await commentService.getAllcmt(taskId);
    res
      .status(200)
      .json({ message: "Lấy danh sách bình luận thành công", comments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lấy danh sách bình luận thất bại" + error.message });
  }
};
