import mongoose from "mongoose";
import * as projectService from "../services/projectService.js";
export const addProject = async (req, res) => {
    try {
        const project = await projectService.createProject(req.body);
        res.status(201).json({
            message: "Tạo dự án thành công!",
            data: project
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json({
            message: "get all project!",
            data: projects
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "ID không hợp lệ",
                data: null
            });
        }
        const project = await projectService.getProjectById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.status(200).json({
            message: "ok!",
            data: project
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "ID không hợp lệ",
                data: null
            });
        }
        const project = await projectService.updateProject(req.params.id, req.body);
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.status(200).json({
            message: " thành công!",
            data: project
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "ID không hợp lệ",
                data: null
            });
        }
        const project = await projectService.deleteProject(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProjectManager = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID không hợp lệ",
                data: null
            });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID không hợp lệ",
                data: null
            });
        }
        const project = await projectService.fetchProjectManager(id);
        if (!project) {
            return res.status(404).json({ message: "Dự án không tồn tại" });
        }

        res.json({
            message: "Lấy thông tin quản lý dự án thành công!",
            data: {
                managerId: project.managerId
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getProjectMembers = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "ID không hợp lệ",
            data: null
        });
    }
    const project = await projectService.fetchProjectMembers(id);

    if (!project) {
      return res.status(404).json({ message: "Dự án không tồn tại" });
    }
    res.json({
        message: "Lấy thông tin members dự án thành công!",
        data: {
            members: project.members
        }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
