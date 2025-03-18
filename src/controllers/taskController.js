import * as taskService from "../services/taskService.js";
import {
  createTaskValidator,
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
// tìm kiếm vấn đề

export const searchTaskController = async (req, res) => {
  try {
    const { assigneeId, assignerId, startDate, endDate } = req.body;
    const { projectId } = req.params;
    console.log(assigneeId,assignerId )
    let filter = {};
     if (projectId && mongoose.isValidObjectId(projectId)) {
      filter.projectId = new mongoose.Types.ObjectId(projectId);
    }
    if (assigneeId && mongoose.isValidObjectId(assigneeId)) {
      filter.assigneeId = new mongoose.Types.ObjectId(assigneeId);
    }
    if (assignerId && mongoose.isValidObjectId(assignerId)) {
      filter.assignerId = new mongoose.Types.ObjectId(assignerId);
    }
    if (startDate) filter.startDate = new Date(startDate);
    if (endDate) filter.endDate = new Date(endDate);

    const searchResult = await taskService.filterTaskService(filter)
    if (searchResult.length === 0) {
      res.status(201).json({ message: "Không tìm thấy kết quả phù hợp" });
    }
    else {
      res.status(200).json({
        message: "Kết quả tìm kiếm",
        task: searchResult
      });
    }
    console.log(searchResult)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Lỗi server" });

  }
} 
// tìm kiếm task(lỗi)

export const searchTaskByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const tasks = await taskService.FindTakByTitle(title);
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
