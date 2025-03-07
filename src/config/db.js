import mongoose, { Error } from 'mongoose';
import dotenv from "dotenv";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI_DB,);
        console.log("✅ Kết nối MongoDB Atlas thành công!");
    } catch (error) {
        console.log("❌ Lỗi kết nối MongoDB:", err)
        process.exit(1);
    }
}

export default connectDB;