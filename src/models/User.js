import mongoose from "mongoose";
import { ROLES } from "../constants/index.js";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: "USER",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
