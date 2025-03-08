import mongoose from 'mongoose';

const WatcherSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Người theo dõi
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, // Công việc được theo dõi (có thể null nếu theo dõi dự án)
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // Dự án được theo dõi (có thể null nếu theo dõi task)
}, { timestamps: true });

// Tạo Model từ Schema
const Watcher = mongoose.model('Watcher', WatcherSchema);

export default Watcher;
