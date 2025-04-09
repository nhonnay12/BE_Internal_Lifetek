const express = require("express");

 const {  getAllNotifiByUserId,deleteNotifi } = require("./notification.controller.js");
 
 const routerNotification = express.Router();
 
routerNotification
    .route("/")
    .get(getAllNotifiByUserId);

routerNotification
  .route("/:id")
  .delete(deleteNotifi)
 
 module.exports = routerNotification;

