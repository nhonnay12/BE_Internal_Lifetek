import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ROLES } from "../constants/index.js";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
      type: Number,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
  },
  { timestamps: true }
);

// hash password trước khi lưu vào db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// so sánh password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// tìm user theo email hoặc phone
userSchema.statics.findByEmailOrPhone = async function (identifier) {
  return await this.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });
}

export default mongoose.model("User", userSchema);