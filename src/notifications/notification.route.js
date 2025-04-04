const express = require("express");
 const { getAllNotifi, getAllNotifiByUserId } = require("./notification.controller.js");
 
 const routerNotification = express.Router();
 
 routerNotification
     .route("/")
     .get(getAllNotifi);
 
 routerNotification
      .route("/:userId")
     .get(getAllNotifiByUserId);
 
 module.exports = routerNotification;