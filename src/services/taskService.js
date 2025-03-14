
import Task from "../models/Task.js";
import mongoose from 'mongoose';

 

export const  updateTaskStatusService = async (taskId,newStatus) => {
     // Kiểm tra xem taskId có hợp lệ không
     if (!mongoose.Types.ObjectId.isValid(taskId)) {
          throw new Error(" task ID không phù hợp");
     }

  // Kiểm tra trạng thái hợp lệ
     const validStatuses = ["pending", "in-progress", "completed"];
          if (!validStatuses.includes(newStatus)) {
          throw new Error("Giá trị status không phù hợp");
     }

  // Cập nhật trạng thái task
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { status: newStatus },
    { new: true }
  );

  if (!updatedTask) {
    throw new Error("Task not found");
  }

  return updatedTask;
} 

/// thêm user vào task


 export const addUserToTask = async (taskId, userId)=> {
  if (!mongoose.Types.ObjectId.isValid(taskId) || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error(" TaskId hoặc userId không phù hợp");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { $addToSet: { assigneeIds: new mongoose.Types.ObjectId(userId) } }, // Dùng $addToSet để tránh trùng lặp
    { new: true }
  ).populate("assigneeIds"); // Populate để lấy chi tiết user nếu cần

  if (!updatedTask) {
    throw new Error("Task không tìm thấy");
  }

  return updatedTask;
}
////
export const searchTaskService = async (data) => {
    try {
      const {  assigneeId, reporter, createAt, dueDate } = data;

      // let filter = {};

      // if (title) filter.title = new RegExp(title, "i"); // Tìm kiếm không phân biệt chữ hoa/thường
      // if (assignee) filter.assignee = assignee;
      // if (reporter) filter.reporter = reporter;
      // if (createAt) filter.createAt = { $gte: new Date(createAt) };
      // if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };

      // const task = await Task.find(filter);

      console.log(assigneeId, reporter, createAt, dueDate)
  } catch (error) {
      console.log(error)
  }
}
export const getAllTasks = async () => {
  return await Task.find().populate("projectId" , "name");
};
export const getTaskByProject = async (projectId) => {
  return await Task.find({ projectId });
};
export const addTask = async (data) => {
  return await Task.create(data);
};
export const editTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, { new: true });
};
export const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

