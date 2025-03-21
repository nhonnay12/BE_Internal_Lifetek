import express from "express";
import * as commentController from "./comment.controller.js";

const routerCmt = express.Router();

// add comment
routerCmt.route("/")
    .post(commentController.addComment);
routerCmt.route("/:id")
    .get(commentController.getAllComments);
export default routerCmt;
