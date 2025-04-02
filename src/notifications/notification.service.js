const Notification = require("./notification.model.js");

exports.getAllNotifi = async (skip, limit) => {
  return await Notification.find()
    .skip(skip)
    .limit(limit)
    .populate("userId", "userName email avatar");
};

exports.countNotifi = async () => {
  return await Notification.countDocuments();
};

exports.FindNotifiByUserId = async (userId) => {
  return await Notification.find({userId: userId})
      .populate("userId","userName email avatar") // Chỉ lấy user name và email của user});
}