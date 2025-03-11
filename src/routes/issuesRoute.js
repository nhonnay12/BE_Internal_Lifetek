import { Router } from "express";
import { addIssue, updateIssue } from "../controllers/issueController.js";

const routeIssues = Router();

routeIssues.post("/create-issue", addIssue);
routeIssues.patch("/update-issue/:id", updateIssue);

export default routeIssues;