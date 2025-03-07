import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3,
    },
    price: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: false,
    },
    sourceImage: {
        type: Array,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        require: true,
    }
}, {
    timestamps: true,
    versionKey: false
})
// Tạo ra một model tên là products
export default mongoose.model('product', productSchema);