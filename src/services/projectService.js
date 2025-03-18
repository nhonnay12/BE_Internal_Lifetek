import Project from "../models/Project.js";

export const createProject = async (data) => {
  
  const existingProject = await Project.findOne({ code:data.code });
  if (existingProject) {
    throw new Error(`Mã code ${data.code} đã tồn tại!`);
  }
  return await Project.create(data);
};

export const getAllProjects = async () => {
  return await Project.find().populate("managerId", "userName email phone");
};

export const getProjectById = async (id) => {
  return await Project.findById(id);
};

export const updateProject = async (id, data) => {
  return await Project.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};
export const fetchProjectManager = async (id) => {
    return await Project.findById(id)
    .populate({
        path: "managerId",
        select: "-password -refreshToken", 
    });;
}
export const fetchProjectMembers = async (projectId) => {
  return await Project.findById(projectId).populate({
    path: "members",
    select: "-password -refreshToken",
  });
};