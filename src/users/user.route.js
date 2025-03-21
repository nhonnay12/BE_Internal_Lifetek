import express from "express";
import * as userController from "./user.controller.js";
import upload from "../config/multer.js";
const routeUser = express.Router();


routeUser.route("/")
    .get(userController.getAllUsers)
routeUser.route("/:id")
    .get(userController.getUserById)
    .put(userController.updateUser)
routeUser.param("id", userController.load);

routeUser.put("/update-profile", upload.single("avatar"), userController.updateUser);


export default routeUser;