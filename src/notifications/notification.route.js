const express = require("express");

 const {  getAllNotifiByUserId,deleteNotifi,handleSubscription,sendTestNotification,updateIsRead } = require("./notification.controller.js");
 
 const routerNotification = express.Router();
 
routerNotification
    .route("/")
    .get(getAllNotifiByUserId);

routerNotification
  .route("/:id")
  .delete(deleteNotifi)
  .put(updateIsRead);

routerNotification
  .route("/subscribe")
  .post(handleSubscription)
  .get(sendTestNotification)
 
 module.exports = routerNotification;

