import { createIssue, editIssue } from "../services/issueService.js";
import { createIssueValidator, updateIssueValidator } from "../validation/issue.js";

export const addIssue = async (req, res) => {
    try {
        const { projectId, taskId, title, description, link,
            userId, attachment, Start_date, end_date, status }
            = req.body;
        const { error } = createIssueValidator.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const issue = createIssue({
            projectId, taskId, title, description, link,
            userId, attachment, Start_date, end_date, status
        });
        return res.status(201).json({
            message: "Issue created successfully",
            issue
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};

export const updateIssue = async (req, res) => {
    try {
        const data = req.body
        const { id } = req.params;
        const { error } = updateIssueValidator.validate(data, { abortEarly: false });

        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors
            });
        }

        const newIssue = editIssue(id, data);
        if (!newIssue) {
            return res.status(404).json({
                message: "Issue khong ton tai"
            });
        }

        return res.status(200).json({
            message: "Issue cap nhat thanh cong",
            newIssue
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}