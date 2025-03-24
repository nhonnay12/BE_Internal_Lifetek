import express from "express";
import * as taskController from "./task.controller.js";
import upload from "../config/multer.js";

const routerTask = express.Router();

routerTask
  .route("/")
  .get(taskController.getAllTasks)
  .post(upload.single("image"), taskController.addTask)
  .delete(taskController.deleteManyTask);

routerTask
  .route("/:taskId")
  .get(taskController.getTaskById)
  .put(upload.single("image"), taskController.updateTask)
  .delete(taskController.deleteTask);
routerTask.param("taskId", taskController.load);

routerTask.put("/:taskId/status", taskController.updateTaskStatus);
routerTask.get("/project/:projectId", taskController.getAlTaskByProject);
routerTask.post("/:taskId/add-user", taskController.addUserToTaskController);
routerTask.post("/filter/:projectId", taskController.searchTaskController);
routerTask.get("/search", taskController.searchTaskByTitle);
export default routerTask;
