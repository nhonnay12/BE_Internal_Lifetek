import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    file_name: {
      type: String,
      required: true,
    },
    file_path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attachment", attachmentSchema);
