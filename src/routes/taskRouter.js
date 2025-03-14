import express from "express";
import {
    getAllTasks, updateTaskStatus, addUserToTaskController, searchTaskController,
    addTask,
    getTaskById,
    updateTask,
    deleteTask,
 } from "../controllers/taskController.js";

const routerTask = express.Router();

routerTask.get("/", getAllTasks);
routerTask.put("/:taskId/status", updateTaskStatus);
routerTask.post("/add-user", addUserToTaskController);
routerTask.post("/search", searchTaskController);
routerTask.post("/create-task", addTask);
routerTask.get("/", getAllTasks);
routerTask.get("/:id", getTaskById);
routerTask.put("/edit-task/:id", updateTask);
routerTask.delete("/delete-task/:id", deleteTask);


export default routerTask;
