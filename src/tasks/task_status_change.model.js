import mongoose from "mongoose";

const JobStatusChangeSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    oldStatus: { type: Number, required: true, enum: [0, 1, 2, 3] },
    newStatus: { type: Number, required: true, enum: [0, 1, 2, 3] },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String },
    notes: { type: String },
    changeSource: { type: Number, required: true, enum: [0, 1, 2] },
}, { timestamps: true });

// Tạo Model từ Schema
const JobStatusChange = mongoose.model("JobStatusChange", JobStatusChangeSchema);

export default JobStatusChange;
