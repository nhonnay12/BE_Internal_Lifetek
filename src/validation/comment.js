import Joi from "joi";

export const validateComment = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    content: Joi.string().min(3).max(500).required(),
  });

  const paramsSchema = Joi.object({
    projectId: Joi.string().hex().length(24).required(),
    taskId: Joi.string().hex().length(24).required(),
    issueId: Joi.string().hex().length(24).required(),
  });

  const { error: bodyError } = schema.validate(req.body);
  if (bodyError)
    return res.status(400).json({ message: bodyError.details[0].message });

  const { error: paramsError } = paramsSchema.validate(req.params);
  if (paramsError)
    return res.status(400).json({ message: paramsError.details[0].message });

  next();
};
