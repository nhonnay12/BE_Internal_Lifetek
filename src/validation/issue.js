import joi from "joi";

export const createIssueValidator = joi.object({
    projectId: joi.string().required().messages({
        "string.empty": "projectId không được để trống",
        "any.required": "projectId là bắt buộc",
    }),
    taskId: joi.string().required().messages({
        "string.empty": "taskId không được để trống",
        "any.required": "taskId là bắt buộc",
    }),
    title: joi.string().required().max(255).messages({
        "string.empty": "title không được để trống",
        "string.max": "title không được quá 255 ký tự",
        "any.required": "title là bắt buộc",
    }),
    description: joi.string().max(255).messages({
        "string.empty": "description không được để trống",
        "string.max": "description không được quá 255 ký tự",
    }),
    link: joi.string().messages({
        "string.empty": "link không được để trống",
    }),
    userId: joi.string().required().messages({
        "string.empty": "userId không được để trống",
        "any.required": "userId là bắt buộc",
    }),
    attachment: joi.string().messages({
        "string.empty": "attachment không được để trống",
    }),
    start_date: joi.date().default(Date.now()),
    end_date: joi.date().required().messages({
        "date.empty": "end_date không được để trống",
        "any.required": "end_date là bắt buộc",
    }),
    status: joi.string().valid("New", "In progress", "Closed").default("New"),
});

export const updateIssueValidator = joi.object({
    projectId: joi.string().messages({
        "string.empty": "projectId không được để trống",
    }),
    taskId: joi.string().messages({
        "string.empty": "taskId không được để trống",
    }),
    title: joi.string().max(255).messages({
        "string.empty": "title không được để trống",
        "string.max": "title không được quá 255 ký tự",
    }),
    description: joi.string().max(255).messages({
        "string.empty": "description không được để trống",
        "string.max": "description không được quá 255 ký tự",
    }),
    link: joi.string().messages({
        "string.empty": "link không được để trống",
    }),
    userId: joi.string().messages({
        "string.empty": "userId không được để trống",
    }),
    attachment: joi.string().messages({
        "string.empty": "attachment không được để trống",
    }),
    start_date: joi.date().default(Date.now()),
    end_date: joi.date().messages({
        "date.empty": "end_date không được để trống",
    }),
    status: joi.string().valid("New", "In progress", "Closed").default("New"),
})