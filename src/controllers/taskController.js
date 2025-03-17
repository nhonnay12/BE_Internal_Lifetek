import * as taskService from "../services/taskService.js";
import {
  createTaskValidator,
  updateTaskValidator,
} from "../validation/taskValidation.js";
import mongoose from "mongoose";

/// thay đổi trạng thái
export const updateTaskStatus = async (req, res) => {
  try {
    console.log(req.params);
    const { taskId } = req.params;

    const { status } = req.body;

    const updatedTask = await taskService.updateTaskStatusService(
      taskId,
      status
    );

    res.status(200).json({
      message: "Thay đổi trạng thái task thành công",
      task: updatedTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// thêm user vào task

export const addUserToTaskController = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;
    const updatedTask = await taskService.addUserToTask(taskId, userId);

    res.status(200).json({
      message: "Thêm người dùng vào task thành công",
      task: updatedTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// lấy tất cả task theo project
export const getAlTaskByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await taskService.getAlTaskByProject(projectId);
    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// tìm kiếm task(lỗi)

// export const searchTaskByTitle = async (req, res) => {
//   try {
//     const { title } = req.params;

//     const tasks = await taskService.FindTaskByTitle(title);
//     res.status(200).json({
//       message: "Tasks fetched successfully",
//       data: tasks,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const searchTaskByTitle = async (req, res) => {
  try {
    console.log("🔍 Query nhận được:", req.query); // Log toàn bộ query
    const title = req.query.search;

    // const title = req.params.title || req.query.title;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập tiêu đề để tìm kiếm" });
    }

    // const formattedTitle = convertToSlug(title); // Chuyển đổi tiêu đề thành không dấu
    const tasks = await taskService.FindTaskByTitle(title);

    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/// thêm task
export const addTask = async (req, res) => {
  try {
    const dataBody = req.body;

    const { error } = createTaskValidator.validate(dataBody, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const task = await taskService.addTask(req.body);
    return res.status(201).json({
      message: "Nhiêm vụ tạo thành công",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// lấy tất cả task
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    return res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// lấy task bằng id
export const getTaskById = async (req, res) => {
  try {
    const task = await taskService.FindTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// cập nhật task
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const dataBody = req.body;
    // const { error } = updateTaskValidator.validate(dataBody, { abortEarly: false });

    // if (error) {
    //   const errors = error.details.map((err) => err.message);
    //   return res.status(400).json({
    //     message: errors,
    //   });
    // }

    const task = await taskService.editTask(id, dataBody);

    if (!task)
      return res.status(404).json({ message: "Nhiệm vụ không tìm thấy" });

    return res.status(200).json({
      message: "Nhiệm vụ cập nhật thành công",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// xóa task
export const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
