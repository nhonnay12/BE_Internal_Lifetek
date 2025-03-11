import Task from '../models/Task.js'
import mongoose from 'mongoose';
import User from "../models/User.js";
export  const getAllTasks = async () => {
     return await Task.find();
}
export const createTasks = async (data) => {
     try {
          const task = new Task({
               title:data.title,
               description: data.description,
               projectId: new mongoose.Types.ObjectId(data.projectId),
               assigneeId: new mongoose.Types.ObjectId(data.assigneeId),
               link: data.link,
               status: data.status,
               image: data.image ? data.image : "",
               dueDate:data.dueDate
          });
          return await task.save();
     } catch (error) {
          console.log(error)
  }
}    

export const  updateTaskStatusService = async (taskId,newStatus) => {
     // Kiểm tra xem taskId có hợp lệ không
     if (!mongoose.Types.ObjectId.isValid(taskId)) {
          throw new Error("Invalid task ID");
     }

  // Kiểm tra trạng thái hợp lệ
     const validStatuses = ["pending", "in-progress", "completed"];
          if (!validStatuses.includes(newStatus)) {
          throw new Error("Invalid status value");
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

export const addUserToTaskService = async (taskId, userId) => {
  // Kiểm tra ID hợp lệ
  if (!mongoose.Types.ObjectId.isValid(taskId) || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid taskId or userId");
  }

  // Kiểm tra task có tồn tại không
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  // Kiểm tra user có tồn tại không
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Kiểm tra xem user đã có trong task chưa
  if (task.assigneeId.includes(userId)) {
    throw new Error("User is already assigned to this task");
  }

  // Thêm user vào danh sách assignees
  task.assigneeId.push(userId);
  await task.save();

  return task;
};