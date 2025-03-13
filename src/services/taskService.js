import Task from "../models/Task.js";

export const getAllTasks = async () => {
  return await Task.find().populate("projectId");
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
