import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
}, {timestamps: true});
  
export default mongoose.model('Project', ProjectSchema);
  