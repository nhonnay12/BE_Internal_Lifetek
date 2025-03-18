import mongoose from "mongoose";
import { uploadSingleFile } from "../services/cloudinaryService.js";
import * as taskService from "../services/taskService.js";
import {
  createTaskValidator,
  updateTaskValidator,
} from "../validation/taskValidation.js";

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

// tìm kiếm task
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

    if (typeof dataBody.assigneeId === "string") {
      dataBody.assigneeId = dataBody.assigneeId.split(",");
    }

    const invalidAssigneeId = dataBody.assigneeId.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidAssigneeId.length > 0) {
      return res.status(400).json({
        message: "Id của assignee không hợp lệ",
      });
    }

    // kiểm tra id của assignee có id nào trong bẳng user không
    const assigneeIds = dataBody.assigneeId;
    const assigneeIdsFromDB = await taskService.checkAssigneeId(assigneeIds);
    if (assigneeIdsFromDB.length !== assigneeIds.length) {
      return res.status(400).json({
        message: "Người nhận việc không hợp lệ",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(dataBody.assignerId)) {
      return res.status(400).json({
        message: "Id của assigner không hợp lệ",
      });
    }

    //kiểm tra id của assigner có id nào trong bảng user không
    const assignerId = dataBody.assignerId;
    const assignerIdFromDB = await taskService.checkAssignerId(assignerId);
    if (!assignerIdFromDB) {
      return res.status(400).json({
        message: "Người giao việc không hợp lệ",
      });
    }

    const { error } = createTaskValidator.validate(dataBody, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    if (req.file) {
      const filePath = req.file.buffer;
      const imageUrl = await uploadSingleFile(filePath);
      dataBody.image = imageUrl.secure_url;
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
    if (typeof dataBody.assigneeId === "string") {
      dataBody.assigneeId = dataBody.assigneeId.split(",");
    }

    const invalidAssigneeId = dataBody.assigneeId.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidAssigneeId.length > 0) {
      return res.status(400).json({
        message: "Id của assignee không hợp lệ",
      });
    }

    // kiểm tra id của assignee có id nào trong bẳng user không
    const assigneeIds = dataBody.assigneeId;
    const assigneeIdsFromDB = await taskService.checkAssigneeId(assigneeIds);
    if (assigneeIdsFromDB.length !== assigneeIds.length) {
      return res.status(400).json({
        message: "Người nhận việc không hợp lệ",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(dataBody.assignerId)) {
      return res.status(400).json({
        message: "Id của assigner không hợp lệ",
      });
    }

    //kiểm tra id của assigner có id nào trong bảng user không
    const assignerId = dataBody.assignerId;
    const assignerIdFromDB = await taskService.checkAssignerId(assignerId);
    if (!assignerIdFromDB) {
      return res.status(400).json({
        message: "Người giao việc không hợp lệ",
      });
    }
    // const { error } = updateTaskValidator.validate(dataBody, { abortEarly: false });

    // if (error) {
    //   const errors = error.details.map((err) => err.message);
    //   return res.status(400).json({
    //     message: errors,
    //   });
    // }

    if (req.file) {
      const filePath = req.file.buffer;
      const imageUrl = await uploadSingleFile(filePath);
      dataBody.image = imageUrl.secure_url;
    }

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
// export const deleteManytask = async (req, res) => {
//   try {
//     console.log("Received IDs:", req.body.ids); // Thêm dòng này để debug
//     const ids = req.body.ids;

//     const result = await taskService.deleteMoreTasks(ids);
//     if (result.deleteCount === 0) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     res.status(200).json({
//       message: "Task deleted successfully",
//       deleteCount: result.deleteCount,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const deleteManyTask = async (req, res) => {
  try {
    console.log("Received IDs:", req.body.ids); // Debug dữ liệu đầu vào

    const ids = req.body.ids;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Danh sách ID không hợp lệ" });
    }

    const result = await taskService.deleteMoreTasks(ids);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy task nào để xóa" });
    }

    res.status(200).json({
      message: "Xóa task thành công",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
