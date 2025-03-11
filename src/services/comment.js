import Comment from "../models/commentModel.js";

export const createComment = async (data) => {
  return await Comment.create(data);
};
