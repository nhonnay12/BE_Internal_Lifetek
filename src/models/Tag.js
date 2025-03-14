import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "#000000",
    },
}, { timestamps: true});

export default mongoose.model('Tag', TagSchema);