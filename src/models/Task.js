import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { type: String },
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project', 
        required: true
    },
    link: {
        type: String, 
        required: true 
    },
    assigneeIds: [
        { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
        }
    ],
    reporter: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    status: { 
        type: String, 
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending' 
        },
    images:[
        { 
            type: String
        }
    ],
    dueDate: { type: Date },// deadline 
  }, { timestamps: true });
export default mongoose.model('tasks', TaskSchema);
  
  