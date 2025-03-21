import mongoose from "mongoose";

const JobStatusChangeSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    oldStatus: { type: String, required: true, enum: ["To Do", "In Progress", "Completed", "Blocked"] },
    newStatus: { type: String, required: true, enum: ["To Do", "In Progress", "Completed", "Blocked"] },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String },
    notes: { type: String },
    changeSource: { type: String, default: "manual", enum: ["manual", "system", "API"] }
},{timestamps: true});

// Tạo Model từ Schema
const JobStatusChange = mongoose.model("JobStatusChange", JobStatusChangeSchema);

export default JobStatusChange;
