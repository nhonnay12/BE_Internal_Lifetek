import Category from "../models/Category.js"
import { categoryValidator } from "../validation/category.js"

export const getAll = async (req, res) => {
    try {
        const data = await Category.find({})

        if (!data || data.length === 0) {
            return resizeBy.status(404).json({
                message: "No category"
            })
        }
        return res.status(200).json({
            message: "Category has been",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        })
    }
}
export const getDetail = async (req, res) => {
    try {
        const data = await Category.findById(req.params.id)

        if (!data) {
            return resizeBy.status(404).json({
                message: "No category"
            })
        }
        return res.status(200).json({
            message: "Category has been",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        })
    }
}

export const create = async (req, res) => {
    try {
        const { error } = categoryValidator.validate(req.body, {abortEarly: false})
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors 
            })
        }
        const data = await Category.create(req.body)

        if (!data) {
            return res.status(404).json({
                message: "Create category not successful"
            })
        }
        return res.status(200).json({
            message: "Create category successful",
            datas: data
        })
    } catch (error) {
        return resizeBy.status(500).json({
            name: error.name,
            message: error.message,
        })
    }
}

export const update = async (req, res) => {
    try {
        const { error } = categoryValidator.validate(req.body, {abortEarly: false})
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors 
            })
        }
        const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true})

        if (!data) {
            return res.status(404).json({
                message: "Update category not successful"
            })
        }
        return res.status(200).json({
            message: "Update category successful",
            datas: data
        })
    } catch (error) {
        return resizeBy.status(500).json({
            name: error.name,
            message: error.message,
        })
    }
}

export const remove = async (req, res) => {
    try {
        const data = await Category.findOneAndDelete(req.params.id)

        if (!data) {
            return res.status(404).json({
                message: "Delete category not successful"
            })
        }
        return res.status(200).json({
            message: "Delete category successful",
            datas: data
        })
    } catch (error) {
        return resizeBy.status(500).json({
            name: error.name,
            message: error.message,
        })
    }
}