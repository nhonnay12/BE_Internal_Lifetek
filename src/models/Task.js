import mongoose from "mongoose";

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
    // người được giao nhiệm vụ
    assigneeId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // người giao nhiệm vụ
    assignerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    link: {
      type: String,
    },
    startDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed", "done"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    images: 
      {
        type: String,
      },
    endDate: { type: Date }, // deadline
  },
  { timestamps: true }
);
export default mongoose.model("Task", TaskSchema);
