import Joi from "joi";

export const createTaskValidator = Joi.object({
    title: Joi.string().required().messages({
        "string.empty": "Tiêu đề không được để trống",
        "any.required": "Tiêu đề là bắt buộc",
    }),
    description: Joi.string().messages({
        "string.empty": "Mô tả không được để trống",
    }),
    projectId: Joi.string().required().messages({
        "string.empty": "projectId không được để trống",
        "any.required": "projectId là bắt buộc",
    }),
    assigneeId: Joi.string().messages({
        "string.empty": "assigneeId không được để trống",
    }),
    status: Joi.string().valid("pending", "in progress", "completed").messages({
        "string.empty": "Trạng thái không được để trống",
        "any.only": "Trạng thái không hợp lệ",
    }),
    priority: Joi.string().valid("low", "medium", "high").messages({
        "string.empty": "Mức độ ưu tiên không được để trống",
        "any.only": "Mức độ ưu tiên không hợp lệ",
    }),
    images: Joi.array().items(Joi.string()).messages({
        "string.empty": "Hình ảnh không được để trống",
    }),
    deadlineDate: Joi.date().messages({
        "date.base": "Ngày hết hạn không hợp lệ",
    }),
});

export const updateTaskValidator = Joi.object({
    title: Joi.string().messages({
        "string.empty": "Tiêu đề không được để trống",
    }),
    description: Joi.string().messages({
        "string.empty": "Mô tả không được để trống",
    }),
    projectId: Joi.string().messages({
        "string.empty": "projectId không được để trống",
    }),
    assigneeId: Joi.string().messages({
        "string.empty": "assigneeId không được để trống",
    }),
    status: Joi.string().valid("pending", "in progress", "completed").messages({
        "string.empty": "Trạng thái không được để trống",
        "any.only": "Trạng thái không hợp lệ",
    }),
    priority: Joi.string().valid("low", "medium", "high").messages({
        "string.empty": "Mức độ ưu tiên không được để trống",
        "any.only": "Mức độ ưu tiên không hợp lệ",
    }),
    images: Joi.array().items(Joi.string()).messages({
        "string.empty": "Hình ảnh không được để trống",
    }),
    deadlineDate: Joi.date().messages({
        "date.base": "Ngày hết hạn không hợp lệ",
    }),
});