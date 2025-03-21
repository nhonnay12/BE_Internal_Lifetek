import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: Number, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["inprogress", "done", "todo"],
      default: "todo",
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
  },
  
  },

  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
