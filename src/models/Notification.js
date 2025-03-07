import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    type: {
        type: String,
        enum: ["task_update", "new_comment", "project_assigned"],
    },
    message: {
        type: String,
        required: true,
    },
    is_read: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

export default mongoose.model('Notification', NotificationSchema);