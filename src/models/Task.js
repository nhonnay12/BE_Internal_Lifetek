import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project', 
        required: true },
    assigneeId:[{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
     assignerId:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    status: { 
        type: String, 
        enum: ['pending', 'in progress', 'completed','done'],
        default: 'pending' 
        },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        default: 'medium' 
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    images:[
        { 
            type: String
        }
    ],
    deadlineDate: { type: Date }, // deadline
  },
  { timestamps: true }
);
export default mongoose.model("Task", TaskSchema);
