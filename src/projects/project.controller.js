import mongoose from "mongoose";
import * as projectService from "./project.service.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import PAGINATE from "../constants/paginate.js";
export const addProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    return new SuccessResponse(project).send(res);
  } catch (error) {
    return next(error);
  }
};

export const getAllProjects = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || PAGINATE.PAGE;
        const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
        const skip = (page - 1) * limit;
        const idUser = req.user._id;
        const projects = await projectService.getAllProjects(idUser, skip, limit);
        const total = await projectService.countProjects(idUser);

        return new SuccessResponse(projects, 200, 'success', total, page, limit).sends(res);
    } catch (error) {
        return next(error);
    }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.project._id);
    if (!project) return next(new Error("Project không tồn tại"));

    return new SuccessResponse(project).send(res);
  } catch (error) {
    return next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.project._id))
      return next(new Error("ID không hợp lệ"));

    const project = await projectService.updateProject(
      req.project._id,
      req.body
    );
    if (!project) return next(new Error("Project không tồn tại"));

    return new SuccessResponse(project).send(res);
  } catch (error) {
    return next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return next(new Error("ID không hợp lệ"));

    const project = await projectService.deleteProject(req.params.id);
    if (!project) return next(new Error("Project không tồn tại"));

    return new SuccessResponse(project).send(res);
  } catch (error) {
    return next(error);
  }
};

export const getProjectManager = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(new Error("ID không hợp lệ"));

    const project = await projectService.fetchProjectManager(id);
    if (!project) return next(new Error("Project không tồn tại"));

    return new SuccessResponse(project).send(res);
  } catch (error) {
    return next(error);
  }
};
export const getProjectMembers = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(new Error("ID không hợp lệ"));

    const project = await projectService.fetchProjectMembers(id);

    if (!project) return next(new Error("Project không tồn tại"));

    return new SuccessResponse(project).send(res);
  } catch (error) {
    return next(error);
  }
};
export const load = async (req, res, next, id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new Error("ID không hợp lệ"));
    }
    const project = await projectService.getProjectById(id);
    if (!project) {
      return next(new Error("Project không tồn tại"));
    }
    req.project = project;
    next();
  } catch (error) {
    return next(error);
  }
};
