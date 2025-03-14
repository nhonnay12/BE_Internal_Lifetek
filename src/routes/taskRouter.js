import express from "express";
import {
  addTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const routerTask = express.Router();

routerTask.post("/create-task", addTask);
routerTask.get("/", getAllTasks);
routerTask.get("/:id", getTaskById);
routerTask.put("/edit-task/:id", updateTask);
routerTask.delete("/delete-task/:id", deleteTask);

export default routerTask;
