import mongoose from "mongoose";
import { create } from "../controllers/categories";
import e from "express";
import { types } from "joi";
const issueSchema = new mongoose.Schema(
  {
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
    title: {
      maxlength: 255,
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 255,
      required: true,
    },
    link: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attachment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attachment",
    },

    Start_date: {
      type: Date,
      default: Date.now,
    },
    end_date: {
      type: Date,
      required: true,
      validate: function (value) {
        return value > this.CreateAt;
      },
      message: "EndDate không được nhỏ hơn start_At!",
    },

    status: {
      type: String,
      enum: [("New", "In progress", "Closed")],
      default: "New",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Issue", issueSchema);
