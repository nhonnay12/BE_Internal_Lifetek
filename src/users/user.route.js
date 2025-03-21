import express from "express";
import * as userController from "./user.controller.js";
import upload from "../config/multer.js";
const routeUser = express.Router();

routeUser.get("/getAll", userController.getAllUsers);
routeUser.get("/", userController.getProfile);
routeUser.put("/update-profile", upload.single("avatar"), userController.updateUser);


export default routeUser;