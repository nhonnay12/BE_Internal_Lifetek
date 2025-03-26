import mongoose from "mongoose";
import { uploadSingleFile } from "../services/cloudinaryService.js";
import * as taskService from "./task.service.js";
import * as taskValidator from "./task.validation.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import PAGINATE from "../constants/paginate.js";
import { PERMISSIONS } from "../constants/index.js";

/// thay đổi trạng thái
export const updateTaskStatus = async (req, res, next) => {
  try {
    // const checkPemission = PERMISSIONS.UPDATE_TASK_STATUS.includes(user);
    const { taskId } = req.params;

    const { status } = req.body;

    const updatedTask = await taskService.updateTaskStatusService(
      taskId,
      status
    );

    return new SuccessResponse(updatedTask).send(res);
  } catch (error) {
    return next(error);
  }
};

// thêm user vào task
export const addUserToTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;
    const updatedTask = await taskService.addUserToTask(taskId, userId);

    return new SuccessResponse(updatedTask).send(res);
  } catch (error) {
    return next(error);
  }
}


// lấy tất cả task theo project
export const getAlTaskByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const page = parseInt(req.query.page) || PAGINATE.PAGE;
    const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
    const skip = (page - 1) * limit;
    const tasks = await taskService.getAlTaskByProject(projectId, skip, limit);
    const total = await taskService.countTaskByProject(projectId);

    return new SuccessResponse(tasks, 200, "success", total, limit).sends(res);
  } catch (error) {
    return next(error);
  }
};
// tìm kiếm vấn đề

export const searchTaskController = async (req, res, next) => {
  try {
    const { assigneeId, assignerId, startDate, endDate } = req.body;
    const { projectId } = req.params;
    console.log(assigneeId, assignerId);
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

    const searchResult = await taskService.filterTaskService(filter);
    if (searchResult.length === 0) {
      return next(new Error("Không tìm thấy task nào"));
    }

    return new SuccessResponse(searchResult).send(res);
  } catch (error) {
    return next(error);
  }
};

// tìm kiếm task

export const searchTaskByTitle = async (req, res, next) => {
  try {
    const title = req.query.search;
    if (!title || title.lenght === 0) {
      return next(new Error("Tiêu đề không được để trống"));
    }
    const tasks = await taskService.FindTaskByTitle(title);
    if (tasks.length === 0) {
      return next(new Error("Không tìm thấy task nào"));
    }
    return new SuccessResponse(tasks).send(res);
  } catch (error) {
    return next(error);
  }
};

/// thêm task
export const addTask = async (req, res, next) => {
  try {
    const user = req.user.role;
    const checkPemission = PERMISSIONS.CREATE_TASK.includes(user);
    if (!checkPemission) {
      return next(new Error("Bạn không có quyền thêm task"));
    }
    const dataBody = req.body;

    if (typeof dataBody.assigneeId === "string") {
      dataBody.assigneeId = dataBody.assigneeId.split(",");
    }
    const { error } = taskValidator.createTaskValidator.validate(dataBody, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return next(new Error(errors));
    }

    const invalidAssigneeId = dataBody.assigneeId.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidAssigneeId.length > 0) {
      return next(new Error("Id của assignee không hợp lệ"));
    }

    // kiểm tra id của assignee có id nào trong bẳng user không
    const assigneeIds = dataBody.assigneeId;
    const assigneeIdsFromDB = await taskService.checkAssigneeId(assigneeIds);
    if (assigneeIdsFromDB.length !== assigneeIds.length) {
      return next(new Error("Người nhận việc không hợp lệ"));
    }

    if (!mongoose.Types.ObjectId.isValid(dataBody.assignerId)) {
      return next(new Error("Id của assigner không hợp lệ"));
    }

    //kiểm tra id của assigner có id nào trong bảng user không
    const assignerId = dataBody.assignerId;
    const assignerIdFromDB = await taskService.checkAssignerId(assignerId);
    if (!assignerIdFromDB) {
      return next(new Error("Người giao việc không hợp lệ"));
    }

    if (req.file) {
      const filePath = req.file.buffer;
      const imageUrl = await uploadSingleFile(filePath);
      dataBody.image = imageUrl.secure_url;
    }

    const task = await taskService.addTask(req.body);
    return new SuccessResponse(task).send(res);
  } catch (error) {
    return next(error);
  }
};

// lấy tất cả task
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    return new SuccessResponse(tasks).send(res);
  } catch (error) {
    return next(error);
  }
};

// lấy task bằng id
export const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.task._id;
    const task = await taskService.FindTaskById(taskId);
    if (!task) return next(new Error("Task không tìm thấy"));
    return new SuccessResponse(task).send(res);
  } catch (error) {
    return next(error);
  }
};

// cập nhật task
export const updateTask = async (req, res, next) => {
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
      return next(new Error("Id của assignee không hợp lệ"));
    }

    // kiểm tra id của assignee có id nào trong bẳng user không
    const assigneeIds = dataBody.assigneeId;
    const assigneeIdsFromDB = await taskService.checkAssigneeId(assigneeIds);
    if (assigneeIdsFromDB.length !== assigneeIds.length) {
      return next(new Error("Người nhận việc không hợp lệ"));
    }

    if (!mongoose.Types.ObjectId.isValid(dataBody.assignerId)) {
      return next(new Error("Id của assigner không hợp lệ"));
    }

    //kiểm tra id của assigner có id nào trong bảng user không
    const assignerId = dataBody.assignerId;
    const assignerIdFromDB = await taskService.checkAssignerId(assignerId);
    if (!assignerIdFromDB) {
      return next(new Error("Người giao việc không hợp lệ"));
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

    if (!task) next(new Error("Task không tìm thấy"));

    return new SuccessResponse(task).send(res);
  } catch (error) {
    return next(error);
  }
};

// xóa task
export const deleteTask = async (req, res, next) => {
  try {
    const task = await taskService.deleteTask(req.task._id);
    if (!task) return next(new Error("Task không tìm thấy"));

    return new SuccessResponse(task).send(res);
  } catch (error) {
    return next(error);
  }
};

export const deleteManyTask = async (req, res, next) => {
  try {
    const ids = req.body.ids;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return next(new Error("Danh sách ID không hợp lệ"));
    }

    const result = await taskService.deleteMoreTasks(ids);

    if (result.deletedCount === 0) {
      return next(new Error("Task không tìm thấy"));
    }

    return new SuccessResponse(null, 200, "Xóa task thành công").send(res);
  } catch (error) {
    return next(error);
  }
};

export const load = async (req, res, next, id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new Error("Id không hợp lệ"));
    }
    const task = await taskService.FindTaskById(id);
    if (!task) return next(new Error("Task không tìm thấy"));
    req.task = task;
    next();
  } catch (error) {
    next(error);
  }
};
