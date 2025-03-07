import Joi from "joi";

export const categoryValidator = Joi.object({

    name: Joi.string().required().min(3).max(255),
    slug: Joi.string().required().min(3).max(255),
    
})