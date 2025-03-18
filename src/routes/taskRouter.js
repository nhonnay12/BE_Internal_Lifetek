import express from "express";
import {
  getAllTasks,
  updateTaskStatus,
  addUserToTaskController,
  addTask,
  getTaskById,
  updateTask,
  deleteTask,
  getAlTaskByProject,
  searchTaskByTitle,
  deleteManytask,
} from "../controllers/taskController.js";

const routerTask = express.Router();

routerTask.get("/", getAllTasks);
routerTask.get("/project/:projectId", getAlTaskByProject);
routerTask.put("/:taskId/status", updateTaskStatus);
routerTask.post("/:taskId/add-user", addUserToTaskController);
routerTask.get("/search", searchTaskByTitle);
routerTask.post("/create-task", addTask);
routerTask.get("/:id", getTaskById);
routerTask.put("/edit-task/:id", updateTask);
routerTask.delete("/delete-task/:id", deleteTask);
routerTask.delete("/delete-many-task", deleteManytask);

export default routerTask;
