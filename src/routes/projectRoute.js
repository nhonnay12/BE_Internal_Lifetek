import express from "express";
import {
    addProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectManager
} from "../controllers/projectController.js";
import { authenticateToken, checkIsAdmin, checkIsProjectMember } from "../middlewares/checkPermisson.js";
const routerProject = express.Router();

routerProject.post("/",/*authenticateToken,checkIsAdmin,*/ addProject);
routerProject.get("/", /*authenticateToken,checkIsAdmin,*/getAllProjects);
routerProject.get("/:id",/*authenticateToken,checkIsProjectMember,*/ getProjectById);
routerProject.put("/:id",/*authenticateToken,checkIsAdmin,*/ updateProject);
routerProject.delete("/:id",/*authenticateToken,checkIsAdmin,*/ deleteProject);
routerProject.get("/:id/manager",/*authenticateToken,*/ getProjectManager);

export default routerProject;
