import express from "express";
import * as commentController from "./comment.controller.js";

const routerCmt = express.Router();

// add comment
routerCmt.route("/")
    .post(commentController.addComment);
routerCmt.route("/:taskId")
    .get(commentController.getAllComments);
routerCmt.param("taskId", commentController.load);
export default routerCmt;
