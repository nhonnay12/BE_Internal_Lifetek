import express from "express";
import * as projectController from "./project.controller.js";

const routerProject = express.Router();

routerProject.post("/",/*authenticateToken,checkIsAdmin,*/ projectController.addProject);
routerProject.get("/", projectController.getAllProjects);
routerProject.get("/:id",/*authenticateToken,checkIsProjectMember,*/ projectController.getProjectById);
routerProject.put("/:id",/*authenticateToken,checkIsAdmin,*/ projectController.updateProject);
routerProject.delete("/:id",/*authenticateToken,checkIsAdmin,*/ projectController.deleteProject);
routerProject.get("/:id/manager",/*authenticateToken,*/ projectController.getProjectManager);
routerProject.get("/:id/members", /*authenticateToken,*/ projectController.getProjectMembers);

export default routerProject;
