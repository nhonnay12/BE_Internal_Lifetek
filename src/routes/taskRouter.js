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
} from "../controllers/taskController.js";
import { FindTakByTitle } from "../services/taskService.js";
import upload from "../config/multer.js";

const routerTask = express.Router();

routerTask.get("/", getAllTasks);
routerTask.get("/project/:projectId", getAlTaskByProject);
routerTask.put("/:taskId/status", updateTaskStatus);
routerTask.post("/:taskId/add-user", addUserToTaskController);
routerTask.get("/search", searchTaskByTitle);
routerTask.post("/create-task", addTask);
routerTask.get("/search", FindTakByTitle);
routerTask.post("/create-task", upload.single("image"), addTask);

routerTask.get("/:id", getTaskById);
routerTask.put("/edit-task/:id", upload.single("image"), updateTask);
routerTask.delete("/delete-task/:id", deleteTask);

export default routerTask;
