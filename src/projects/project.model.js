import mongoose from "mongoose";
import { PRIORITY, STATUS_PROJECT } from "../constants/index.js";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: Number, required: true },
    description: { type: String },
    status: {
      type: Number,
      enum: Object.values(STATUS_PROJECT), 
      default: STATUS_PROJECT.PROGRESSING,
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    priority: {
      type: Number,
      enum: Object.values(PRIORITY),
      default: PRIORITY.LOW,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
