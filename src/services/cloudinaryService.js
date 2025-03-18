import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import fs from "fs";

/**
 * Upload một file lên Cloudinary
 * @param filePath Đường dẫn file tạm thời
 * @param folder Thư mục lưu ảnh trên Cloudinary
 * @returns URL ảnh trên Cloudinary
 */

const uploadSingleFile = (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            { folder: "uploads" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

/**
 * Upload nhiều file lên Cloudinary
 * @param filePaths Danh sách đường dẫn file tạm thời
 * @param folder Thư mục lưu ảnh trên Cloudinary
 * @returns Danh sách URL ảnh đã upload
 */

const uploadMultipleFiles = async (files, folder = 'lifeTexIntern') => {
    try {
        const urls = [];
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder,
                use_filename: true,
            });
            urls.push(result.secure_url);
            fs.unlinkSync(file.path);
        }
        return urls;
    } catch (error) {
        console.error(error);
        throw new Error("Upload files failed!");
    }
}

export { uploadSingleFile, uploadMultipleFiles };