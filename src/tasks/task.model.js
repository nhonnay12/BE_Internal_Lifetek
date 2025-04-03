const mongoose = require("mongoose");
const { STATUS } = require("../constants/statusConstants.js");
const { PRIORITY } = require("../constants/index.js");
const removeAccents = require("remove-accents");
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slugName: { type: String }, // Trường không dấu để tìm kiếm
    description: { type: String },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assigneeId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    assignerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    link: {
      type: String,
    },
    startDate: { type: Date, default: Date.now },
    status: {
      type: Number,
      enum: Object.values(STATUS),
      default: STATUS.PREPARE,
    },
    priority: {
      type: Number,
      enum: Object.values(PRIORITY),
      default: PRIORITY.MEDIUM,
    },
    image: {
      type: String,
    },
    endDate: { type: Date }, // deadline
  },
  { timestamps: true }
);
// 📌 Middleware: Chuyển đổi `name` thành `slugName` trước khi lưu
TaskSchema.pre("save", function (next) {
  this.slugName = removeAccents.remove(this.title.toLowerCase()); // Loại bỏ dấu
  next();
});
module.exports = mongoose.model("Task", TaskSchema);
