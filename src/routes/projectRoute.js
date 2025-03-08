import express from "express";
import {
    addProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} from "../controllers/projectController.js";

const routerProject = express.Router();

routerProject.post("/", addProject);
routerProject.get("/", getAllProjects);
routerProject.get("/:id", getProjectById);
routerProject.put("/:id", updateProject);
routerProject.delete("/:id", deleteProject);

export default routerProject;
