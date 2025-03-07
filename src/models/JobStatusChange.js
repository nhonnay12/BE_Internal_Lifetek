import mongoose from "mongoose";

const JobStatusChangeSchema = new mongoose.Schema(
  {
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    old_status: {
      type: String,
      required: true,
      enum: ["To Do", "In Progress", "Completed", "Blocked"],
    },
    new_status: {
      type: String,
      required: true,
      enum: ["To Do", "In Progress", "Completed", "Blocked"],
    },
    changed_at: { type: Date, default: Date.now },
    changed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: { type: String },
    notes: { type: String },
    change_source: {
      type: String,
      default: "manual",
      enum: ["manual", "system", "API"],
    },
  },
  { timestamps: true }
);

// Tạo Model từ Schema
const JobStatusChange = mongoose.model(
  "JobStatusChange",
  JobStatusChangeSchema
);

export default JobStatusChange;
