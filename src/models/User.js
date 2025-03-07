import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("User", userSchema);
