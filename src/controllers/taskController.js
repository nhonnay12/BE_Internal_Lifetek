import * as taskService from "../services/taskService.js";
import * as projectService from "../services/projectService.js";
import * as userService from "../services/userService.js";
import { createTaskValidator } from "../validation/taskValidation.js";

export const addTask = async (req, res) => {
  try {

    const dataBody = req.body;

    const { error } = createTaskValidator.validate(dataBody, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const task = await taskService.addTask(req.body);
    res.status(201).json({
      message: "Nhiêm vụ tạo thành công",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const dataBody = req.body;

    const projectId = projectService.getProjectById(dataBody.projectId);
    if (!projectId) return res.status(404).json({ message: "Dự án không hợp lệ" });

    if (dataBody.assigneeId || dataBody.assignerId) {
      dataBody.assigneeId.forEach((assigneeId) => {
        const assignee = userService.geUserById(assigneeId);
        if (!assignee) return res.status(404).json({ message: "Người dùng không hợp lệ" });
      });

      const assignerId = userService.geUserById(dataBody.assignerId);
      if (!assignerId) return res.status(404).json({ message: "Người dùng không hợp lệ" });
    }

    const { error } = createTaskValidator.validate(dataBody, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const task = await taskService.editTask(id, dataBody);

    if (!task) return res.status(404).json({ message: "Nhiệm vụ không tìm thấy" });

    return res.status(200).json({
      message: "Nhiệm vụ cập nhật thành công",
      data: task,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
