import express from "express";
import { getAllTask,createTask,updateTaskStatus,addUserToTaskController,searchTaskController } from "../controllers/taskControler.js";

const routerTask = express.Router();
/**
 * @swagger
 * tags:
 *   name: Task
 *   description: API xử lý vấn đề
 */

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Lấy danh sách tất cả công việc
 *     description: Trả về danh sách các công việc trong hệ thống
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách công việc
 */
routerTask.get("/", getAllTask);

/**
 * @swagger
 * /api/task/create:
 *   post:
 *     summary: Tạo công việc mới
 *     description: Thêm một công việc mới vào hệ thống
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - assignee
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Fix lỗi UI trên trang Dashboard"
 *               assignee:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: Tạo công việc thành công
 */
routerTask.post("/create", createTask);

/**
 * @swagger
 * /api/task/{taskId}/status:
 *   put:
 *     summary: Cập nhật trạng thái công việc
 *     description: Cập nhật trạng thái của một công việc theo ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của công việc cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
routerTask.put("/:taskId/status", updateTaskStatus);

/**
 * @swagger
 * /api/task/add-user:
 *   post:
 *     summary: Thêm người dùng vào công việc
 *     description: Gán một người dùng vào công việc cụ thể
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *               - userId
 *             properties:
 *               taskId:
 *                 type: string
 *                 example: "660b5c2e2f1c1a001f4d9d6a"
 *               userId:
 *                 type: string
 *                 example: "651a2f2b3e9c7b0024c8d3f5"
 *     responses:
 *       200:
 *         description: Người dùng đã được thêm vào công việc
 */
routerTask.post("/add-user", addUserToTaskController);

/**
 * @swagger
 * /api/task/search:
 *   post:
 *     summary: Tìm kiếm công việc
 *     description: Tìm kiếm công việc theo tiêu chí (người giao, người báo cáo, ngày giao, ngày kết thúc, tên công việc)
 *     tags: [Task]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assignedBy:
 *                 type: string
 *                 example: "John Doe"
 *               reportedBy:
 *                 type: string
 *                 example: "Jane Smith"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-01"
 *               title:
 *                 type: string
 *                 example: "Fix lỗi API"
 *     responses:
 *       200:
 *         description: Trả về danh sách công việc phù hợp với tiêu chí tìm kiếm
 */
routerTask.post("/search", searchTaskController);
export default routerTask;
