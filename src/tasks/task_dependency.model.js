import mongoose from "mongoose";

const TaskDependency = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    taskDependency_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    type: {
        type: String,
        enum: ["blocks", "is_blocked_by", "related_to"],
        required: true,
    },
}, { timestamps: true});


export default mongoose.model("Task_dependency", TaskDependency);