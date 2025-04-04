const mongoose = require("mongoose");
const { uploadSingleFile } = require("../services/cloudinaryService.js");
const taskService = require("./task.service.js");
const taskStatusChangeService = require("./statusChange.service.js");
const taskValidator = require("./task.validation.js");
const SuccessResponse = require("../utils/SuccessResponse.js");
const PAGINATE = require("../constants/paginate.js");
const { CHANGE_SOURCE, PERMISSIONS } = require("../constants/index.js");
const { STATUS } = require("../constants/statusConstants.js");
const projectService = require("../projects/project.service.js");
const { ObjectId } = require("mongodb");
/// thay đổi trạng thái
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const roleUser = req.user.role;
    const { oldStatus, newStatus } = req.body;

    const canChangeStatus = (role, oldStatus, newStatus) => {
      const allowedStatuses = PERMISSIONS.TASK_STATUS_CHANGE[role] || [];
      return allowedStatuses.includes(newStatus);
    };

    if (!canChangeStatus(roleUser, oldStatus, newStatus)) {
      return next(new Error("Bạn không có quyền thay đổi trạng thái"));
    }

    const { taskId } = req.params;
    const userId = req.user._id;

    if (
      !Object.values(STATUS).includes(oldStatus) ||
      !Object.values(STATUS).includes(newStatus)
    ) {
      return next(new Error("Trạng thái không hợp lệ !"));
    }

    const updatedTask = await taskStatusChangeService.updateTaskStatusService(
      taskId,
      oldStatus,
      newStatus,
      userId,
      "Theo dõi thay đổi",
      "tự động khi thay đổi trạng thái",
      CHANGE_SOURCE.API
    );

    return new SuccessResponse(updatedTask).send(res);
  } catch (error) {
    return error;
  }
};

// thêm user vào task
// exports.addUserToTaskController = async (req, res, next) => {
// try {
//   const { taskId } = req.params;
//   const { assigneeId } = req.body;
//   const roleUser = req.user.role;
//   const checkPermission = PERMISSIONS.ASSIGN_TASK.includes(roleUser);
//   const projectId = task.projectId;

//   if (!checkPermission) {
//     return next({
//       statusCode: 403,
//       message: "You don't have permission to add user to task",
//     });
//   }
//   if (!assigneeId) {
//     return next({
//       statusCode: 400,
//       message: "AssigneeId is required",
//     });
//   }

//   const task = await taskService.getTaskById(taskId);
//   if (!task) {
//     return next({
//       statusCode: 404,
//       message: "Task not found",
//     });
//   }

//   if (task.assigneeId.includes(assigneeId)) {
//     return next({
//       statusCode: 400,
//       message: "Người dùng đã được thêm rồi!!",
//     });
//   }

//   const updatedTask = await taskService.addUserToTask(taskId, assigneeId);
//   return new SuccessResponse(updatedTask).send(res);
// } catch (error) {
//   return next(error);
// }
// };
exports.addUserToTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { assigneeId } = req.body;
    const roleUser = req.user.role;

    // Kiểm tra quyền
    const checkPermission = PERMISSIONS.ASSIGN_TASK.includes(roleUser);
    if (!checkPermission) {
      return next({
        statusCode: 403,
        message: "Bạn không có quyền thêm người dùng vào task",
      });
    }

    // Kiểm tra assigneeId có tồn tại không
    if (!assigneeId) {
      return next({
        statusCode: 400,
        message: "AssigneeId không tồn tạitại",
      });
    }
    const task = await taskService.getTaskById(taskId);

    if (!task) {
      return next({
        statusCode: 404,
        message: "Không tìm thấy task",
      });
    }

    // Lấy projectId từ task
    const projectId = task.projectId;

    // Kiểm tra xem assigneeId có trong project không
    const project = await projectService.getProjectById(projectId);
    if (!project) {
      return next({
        statusCode: 404,
        message: " Không tìm thấy Project",
      });
    }
  const assigneeIdsObject = assigneeId.map(id => new ObjectId(id)); // Chuyển sang ObjectId
  const exists = assigneeIdsObject.some(id => project.members.some(member => member.equals(id)));
   
    if (!exists) {
      return next({
        statusCode: 400,
        message: "Người dùng không có trong project",
      });
    }


    // Thêm user vào task
    const updatedTask = await taskService.addUserToTask(taskId, assigneeId,projectId);
    

    return new SuccessResponse(updatedTask).send(res);
  } catch (error) {
    return next(error);
  }
};

// lấy tất cả task theo project
exports.getAlTaskByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const page = parseInt(req.query.page) || PAGINATE.PAGE;
    const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
    const skip = (page - 1) * limit;
    const tasks = await taskService.getAlTaskByProject(projectId, skip, limit);
    const total = await taskService.countTaskByProject(projectId);

    return new SuccessResponse(tasks, 200, "success", total, page, limit).sends(
      res
    );
  } catch (error) {
    return next(error);
  }
};
// lọc task theo điều kiện

exports.filterTaskController = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { status, priority, assigneeId, startDate, endDate } = req.body;
    let filter = { projectId };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assigneeId) filter.assigneeId = { $in: assigneeId };
    if (startDate) filter.startDate = { $gte: new Date(startDate) };
    if (endDate) filter.endDate = { $lte: new Date(endDate) };

    const page = parseInt(req.query.page) || PAGINATE.PAGE;
    const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
    const skip = (page - 1) * limit;
    const searchResult = await taskService.filterTaskService(
      skip,
      limit,
      filter
    );
    const total = searchResult.length;
    if (searchResult.length === 0) {
      return new SuccessResponse("Không tìm thấy task nào", 404).send(res);
    }

    return new SuccessResponse(
      searchResult,
      200,
      "success",
      total,
      page,
      limit,
      filter
    ).sends(res);
  } catch (error) {
    return next(error);
  }
};

// tìm kiếm task// tìm kiếm task
exports.searchTaskByTitle = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const title = req.query.search.trim();
    const assigneeIds = req.user._id;
    if (!title || title.length === 0) {
      return next(new Error("Tiêu đề không được để trống"));
    }
    const page = parseInt(req.query.page) || PAGINATE.PAGE;
    const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
    const skip = (page - 1) * limit;
    const tasks = await taskService.FindTaskByTitle(
      skip,
      limit,
      title,
      assigneeIds,
      projectId
    );
    const total = tasks.length;

    return new SuccessResponse(tasks, 200, "success", total, page, limit).sends(
      res
    );
  } catch (error) {
    return next(error);
  }
};

/// thêm task
exports.addTask = async (req, res, next) => {
  try {
    const user = req.user.role;

    const checkPermission = PERMISSIONS.CREATE_TASK.includes(user);
    if (!checkPermission) {
      return next(new Error("Bạn không có quyền thêm task"));
    }
    const dataBody = req.body;
    // if (typeof dataBody.priority === "string") {
    //   dataBody.priority = Number(dataBody.priority);
    // }
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
    // 📌 Kiểm tra ngày kết thúc phải sau ngày bắt đầu
    if (
      dataBody.endDate &&
      new Date(dataBody.endDate) <= new Date(dataBody.startDate)
    ) {
      return next(new Error("Ngày kết thúc phải sau ngày bắt đầu"));
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
exports.getAllTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || PAGINATE.PAGE;
    const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
    const skip = (page - 1) * limit;
    const tasks = await taskService.getAllTasks(skip, limit);
    const total = await taskService.countTasks();

    return new SuccessResponse(tasks, 200, "success", total, page, limit).sends(
      res
    );
  } catch (error) {
    return next(error);
  }
};

// lấy task bằng id
exports.getTaskById = async (req, res, next) => {
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
exports.updateTask = async (req, res, next) => {
  try {
    const id = req.task._id;
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
      return next(new Error("người được giao nhiệm vụ không hợp lệ"));
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
    const { error } = taskValidator.updateTaskValidator.validate(dataBody, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return next(new Error(errors));
    }

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
exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = req.task._id;
    const task = await taskService.deleteTask(taskId);
    if (!task) return next(new Error("Task không tìm thấy"));

    return new SuccessResponse("Xóa task thành công").send(res);
  } catch (error) {
    return next(error);
  }
};

exports.deleteManyTask = async (req, res, next) => {
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

exports.load = async (req, res, next, id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new Error("Status không phù hợp"));
    }
    const task = await taskService.FindTaskById(id);
    if (!task) return next(new Error("Task không tìm thấy"));
    req.task = task;
    next();
  } catch (error) {
    next(error);
  }
};
