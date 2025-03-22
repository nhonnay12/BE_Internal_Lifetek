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
        type: Number,
        enum: [0, 1, 2],
        default: 1,
        required: true,
    },
}, { timestamps: true});


export default mongoose.model("Task_dependency", TaskDependency);