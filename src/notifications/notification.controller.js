const mongoose = require("mongoose");
const SuccessResponse = require("../utils/SuccessResponse.js");
const PAGINATE = require("../constants/paginate.js");
const notifiService = require("./notification.service.js")
 
exports.getAllNotifi = async (req, res, next) => {
   try {
     const page = parseInt(req.query.page) || PAGINATE.PAGE;
     const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
     const skip = (page - 1) * limit;
     const tasks = await notifiService.getAllNotifi(skip, limit);
     const total = await notifiService.countNotifi();
 
     return new SuccessResponse(tasks, 200, "success", total, page, limit).sends(res);
   } catch (error) {
     return next(error);
   }
};
 
exports.getAllNotifiByUserId = async (req, res, next) => {
   try {
    const  userId  = req.user._id;
    console.log(userId)
    const notifi = await notifiService.FindNotifiByUserId(userId);
 
    if (!notifi) return next(new Error("Thông báo không tồn tại"));
    return new SuccessResponse(notifi).send(res);
     
  } catch (error) {
    return next(error);
  }
}
