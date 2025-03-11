import * as commentService from "../services/commentService.js";

export const addComment = async (req, res) => {
  try {
    const { projectId, taskId, issueId } = req.params;
    const { userId, content } = req.user.id;
    const comment = await commentService.createComment({
      projectId,
      taskId,
      issueId,
      userId,
      content,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
