import Joi from "joi";

export const validateComment = (req, res, next) => {
  const schema = Joi.object({
    projectId: Joi.string().hex().length(24).required(),
    taskId: Joi.string().hex().length(24).required(),
    userId: Joi.string().hex().length(24).required(),
    issueId: Joi.string().hex().length(24).required(),
    content: Joi.string().min(3).max(500).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};
