import express from "express";
import { getAllUsers, getProfile, updateUser } from "../controllers/user.js";
import upload from "../config/multer.js";
const routeUser = express.Router();

routeUser.get("/getAll", getAllUsers);
routeUser.get("/", getProfile);
routeUser.put("/update-profile", upload.single("avatar"), updateUser);


export default routeUser;