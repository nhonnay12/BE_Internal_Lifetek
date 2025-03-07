import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
  
export default mongoose.model('projects', ProjectSchema);
  