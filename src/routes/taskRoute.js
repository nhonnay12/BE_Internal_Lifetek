import express from "express";
import { getAllTask,createTask,updateTaskStatus,addUserToTaskController } from "../controllers/taskControler.js";

const routerTask = express.Router();


routerTask.get("/", getAllTask);
routerTask.post('/create', createTask);
routerTask.put("/:taskId/status", updateTaskStatus);
routerTask.post("/add-user", addUserToTaskController);

export default routerTask;
