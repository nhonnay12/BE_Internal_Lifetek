import Task from "../models/Task.js";
import mongoose from 'mongoose';

export const updateTaskStatusService = async (taskId, newStatus) => {
  // Kiểm tra xem taskId có hợp lệ không
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error(" task ID không phù hợp");
  }

  // Kiểm tra trạng thái hợp lệ
  const validStatuses = ["pending", "in progress", "completed", "done"];
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


export const addUserToTask = async (taskId, userId) => {


  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { $addToSet: { assigneeId: { $each: userId.map(id => new mongoose.Types.ObjectId(id)) } } }, // Dùng $addToSet để tránh trùng lặp
    { new: true }, { assigneeId: 1 }
  );// Populate để lấy chi tiết user nếu cần

  if (!updatedTask) {
    throw new Error("Task không tìm thấy");
  }

  return updatedTask;
}
////
export const searchTaskService = async (data) => {
  try {
    const task = await Task.find(data);
    return task;
  } catch (error) {
    console.log(error)
  }
}
export const getAllTasks = async () => {
  return await Task.find().select("+assigneeId +assignerId");;
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
export const getAlTaskByProject = async (projectId) => {
  return await Task.find({ projectId })
    .populate({
      path: "assigneeId",
      select: "userName email", // Chỉ lấy userName và email của user
    })
    .populate({
      path: "assignerId",
      select: "userName email",
    });
}

