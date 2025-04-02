const express = require("express");
const notificontroller = require("./notification.controller.js");

const routerNotification = express.Router();

routerNotification
    .route("/")
    .get(notificontroller.getAllNotifi);

routerNotification
     .route("/:userId")
    .get(notificontroller.getAllNotifiByUserId);

module.exports = routerNotification;