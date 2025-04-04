const express = require("express");

 const { getAllNotifi, getAllNotifiByUserId } = require("./notification.controller.js");
 
 const routerNotification = express.Router();
 
 routerNotification
     .route("/")
     .get(getAllNotifiByUserId);
 

 
 module.exports = routerNotification;

