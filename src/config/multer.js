import multer from "multer";

// Cấu hình Multer (lưu file vào RAM, không lưu vào thư mục)
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

export default upload;