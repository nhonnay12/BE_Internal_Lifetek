import express from "express";
import * as taskController from "./task.controller.js";
import upload from "../config/multer.js";

const routerTask = express.Router();

routerTask.get("/",  taskController.getAllTasks);
routerTask.get("/project/:projectId", taskController.getAlTaskByProject);
routerTask.put("/:taskId/status", taskController.updateTaskStatus);
routerTask.post("/:taskId/add-user", taskController.addUserToTaskController);
routerTask.post("/filter/:projectId", taskController.searchTaskController);
routerTask.get("/search", taskController.searchTaskByTitle);
routerTask.post("/create-task", upload.single("image"), taskController.addTask);
routerTask.get("/:id", taskController.getTaskById);
routerTask.put("/edit-task/:id", upload.single("image"), taskController.updateTask);
routerTask.delete("/delete-task/:id", taskController.deleteTask);
routerTask.delete("/delete-many-task", taskController.deleteManyTask);

export default routerTask;
