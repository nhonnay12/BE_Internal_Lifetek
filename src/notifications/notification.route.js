const express = require("express");

 const {  getAllNotifiByUserId,deleteNotifi,handleSubscription,sendTestNotification } = require("./notification.controller.js");
 
 const routerNotification = express.Router();
 
routerNotification
    .route("/")
    .get(getAllNotifiByUserId);

routerNotification
  .route("/:id")
  .delete(deleteNotifi);

routerNotification
  .route("/subscribe")
  .post(handleSubscription)
  .get(sendTestNotification)
 
 module.exports = routerNotification;

