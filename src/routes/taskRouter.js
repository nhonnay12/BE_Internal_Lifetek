import express from "express";
import {
  getAllTasks,
  updateTaskStatus,
  addUserToTaskController,
  addTask,
  searchTaskController,
  getTaskById,
  updateTask,
  deleteTask,
  getAlTaskByProject,
} from "../controllers/taskController.js";
import { FindTakByTitle } from "../services/taskService.js";

const routerTask = express.Router();

routerTask.get("/", getAllTasks);
routerTask.get("/project/:projectId", getAlTaskByProject);
routerTask.put("/:taskId/status", updateTaskStatus);
routerTask.post("/:taskId/add-user", addUserToTaskController);
routerTask.get("/search", FindTakByTitle);
routerTask.post("/filter/:projectId", searchTaskController);
routerTask.post("/create-task", addTask);

routerTask.get("/:id", getTaskById);
routerTask.put("/edit-task/:id", updateTask);
routerTask.delete("/delete-task/:id", deleteTask);

export default routerTask;
