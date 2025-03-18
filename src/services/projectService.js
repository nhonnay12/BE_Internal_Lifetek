import Project from "../models/Project.js";
import User from "../models/User.js";
export const createProject = async (data) => {
  
  const existingProject = await Project.findOne({ code:data.code });
  const managerExists = await isUserExist(data.managerId);
  if (!managerExists) {
    throw new Error(`Manager với id ${data.managerId} không tồn tại!`);
  }
  if (data.members && data.members.length > 0) {
    for (let memberId of data.members) {
      const isMemberValid = await isUserExist(memberId);
      if (!isMemberValid) {
        throw new Error(`Thành viên với id ${memberId} không tồn tại!`);
      }
    }
  }
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
const isUserExist = async (id) => {
  const user = await User.findById(id);
  return !!user; // true nếu tồn tại, false nếu không
};