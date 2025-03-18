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
  searchTaskByTitle,
  deleteManytask,
} from "../controllers/taskController.js";
import upload from "../config/multer.js";

const routerTask = express.Router();

routerTask.get("/", getAllTasks);
routerTask.get("/project/:projectId", getAlTaskByProject);
routerTask.put("/:taskId/status", updateTaskStatus);
routerTask.post("/:taskId/add-user", addUserToTaskController);
routerTask.post("/filter/:projectId", searchTaskController);
routerTask.get("/search", searchTaskByTitle);
routerTask.post("/create-task", upload.single("image"), addTask);
routerTask.get("/:id", getTaskById);
routerTask.put("/edit-task/:id", upload.single("image"), updateTask);
routerTask.delete("/delete-task/:id", deleteTask);
routerTask.delete("/delete-many-task", deleteManytask);

export default routerTask;
