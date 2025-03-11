import express from "express";
import { getAllTask,createTask,updateTaskStatus,addUserToTask } from "../controllers/taskControler.js";

const routerTask = express.Router();


routerTask.get("/", getAllTask);
routerTask.post('/create', createTask);
routerTask.put("/:taskId/status", updateTaskStatus);
routerTask.post("/add-user", addUserToTask);

export default routerTask;
