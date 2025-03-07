import Joi from "joi";

export const productValid = Joi.object({

    name: Joi.string().required().min(3),
    price: Joi.string().required(),
    sourceImage: Joi.array().required(),
    category: Joi.string().required(),
    categoryId: Joi.string().required(),
    description: Joi.string().required(false),
})