import express from "express";
import { getAllUsers } from "../controllers/user.js";
const route = express.Router();

route.get("/", getAllUsers);

export default route;