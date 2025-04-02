const mongoose = require("mongoose");
const { STATUS } = require("../constants/statusConstants.js");
const { PRIORITY, STATUS_TASK } = require("../constants/index.js");
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
     slugName: { type: String, required: true, unique: true },
    description: { type: String },
    type: {
      type: String,
      enum: ['bug', 'new_request'], 
      required: true,
    },
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
TaskSchema.pre("save", function (next) {
    this.slugName = removeAccents.remove(this.title.toLowerCase()); // Xóa dấu
    next();
});
module.exports = mongoose.model("Task", TaskSchema);
