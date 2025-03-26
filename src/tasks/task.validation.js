import joiObjectId from "joi-objectid";
import Joi from "joi";

Joi.objectId = joiObjectId(Joi);

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

    assigneeId: Joi.array().items(Joi.objectId()).required().messages({
        "string.empty": "assignerId không được để trống",
        "any.required": "assignerId là bắt buộc",
    }),
    assignerId: Joi.string().messages({
        "string.empty": "assigneeId không được để trống",
    }),
    status: Joi.string().valid("pending", "inProgress", "completed", "done").messages({
        "string.empty": "Trạng thái không được để trống",
        "any.only": "Trạng thái không hợp lệ",
    }),
    priority: Joi.string().valid("low", "medium", "high").messages({
        "string.empty": "Mức độ ưu tiên không được để trống",
        "any.only": "Mức độ ưu tiên không hợp lệ",
    }),
    image: Joi.string().uri().messages({
        "string.empty": "Hình ảnh không được để trống",
        "string.uri": "Hình ảnh không hợp lệ",
    }),
    link: Joi.string().messages({
        "string.empty": "Link không được để trống",
    }),
    startDate: Joi.date().messages({
        "date.base": "Ngày bắt đầu không hợp lệ",
    }),
    endDate: Joi.date().messages({
        "date.base": "Ngày hết hạn không hợp lệ",
    }),
});

export const updateTaskValidator = Joi.object({
    title: Joi.string().required().messages({
        "string.empty": "Tiêu đề không được để trống",
        "any.required": "Tiêu đề là bắt buộc",
    }),
    description: Joi.string().optional().messages({
        "string.empty": "Mô tả không được để trống",
    }),
    projectId: Joi.objectId().required().messages({
        "string.empty": "projectId không được để trống",
        "any.required": "projectId là bắt buộc",
    }),
    assigneeId: Joi.array().items(Joi.objectId()).optional().messages({
        "string.empty": "assigneeId không được để trống",
    }),
    assignerId: Joi.objectId().required().messages({
        "string.empty": "assignerId không được để trống",
        "any.required": "assignerId là bắt buộc",
    }),
    status: Joi.string().valid("pending", "inProgress", "completed", "done").default("pending").messages({
        "string.empty": "Trạng thái không được để trống",
        "any.only": "Trạng thái không hợp lệ",
    }),
    priority: Joi.string().valid("low", "medium", "high").default("medium").messages({
        "string.empty": "Mức độ ưu tiên không được để trống",
        "any.only": "Mức độ ưu tiên không hợp lệ",
    })
    ,
    images: Joi.string().uri().optional().messages({
        "string.empty": "Hình ảnh không được để trống",
        "string.uri": "Hình ảnh không hợp lệ",
    }),
    link: Joi.string().messages({
        "string.empty": "Link không được để trống",
    }),
    startDate: Joi.date().messages({
        "date.base": "Ngày bắt đầu không hợp lệ",
    }),
    endDate: Joi.date().messages({
        "date.base": "Ngày hết hạn không hợp lệ",
    }),
});