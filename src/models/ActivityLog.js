import mongoose from 'mongoose';

const ActivityLogSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Người thực hiện hành động
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // Dự án liên quan (nếu có)
    task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, // Công việc liên quan (nếu có)
    action: { type: String, required: true }, // Hành động thực hiện (VD: "created task", "updated status")
    description: { type: String, required: true }, // Mô tả chi tiết về hoạt động
    created_at: { type: Date, default: Date.now } // Thời điểm thực hiện hành động
});

// Tạo Model từ Schema
const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);

export default ActivityLog;
