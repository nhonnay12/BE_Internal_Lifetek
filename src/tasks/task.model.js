import mongoose from "mongoose";
import { PRIORITY, STATUS } from "../constants/index.js";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assigneeId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    assignerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    link: {
      type: String,
    },
    startDate: { type: Date, default: Date.now },

    status: {
      type: String,
      enum: Object.values(STATUS),
      default: "pending",
    },
    priority: {
      type: String,
      enum: Object.values(PRIORITY),
      default: "medium",
    },
    image:
    {
      type: String,
    },
    endDate: { type: Date }, // deadline
  },
  { timestamps: true }
);
export default mongoose.model("Task", TaskSchema);