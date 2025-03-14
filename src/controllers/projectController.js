<<<<<<< HEAD

// import projectService from "../services/projectService";

// export const createProject = async (req, res) => {
//     try {
//         const project = await projectService.createProject(req.body);
//         res.status(201).json(project);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const getAllProjects = async (req, res) => {
//     try {
//         const projects = await projectService.getAllProjects();
//         res.status(200).json(projects);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const getProjectById = async (req, res) => {
//     try {
//         const project = await projectService.getProjectById(req.params.id);
//         if (!project) return res.status(404).json({ message: "Project not found" });
//         res.status(200).json(project);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const updateProject = async (req, res) => {
//     try {
//         const project = await projectService.updateProject(req.params.id, req.body);
//         if (!project) return res.status(404).json({ message: "Project not found" });
//         res.status(200).json(project);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const deleteProject = async (req, res) => {
//     try {
//         const project = await projectService.deleteProject(req.params.id);
//         if (!project) return res.status(404).json({ message: "Project not found" });
//         res.status(200).json({ message: "Project deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

=======
import * as projectService from "../services/projectService.js";
export const addProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await projectService.deleteProject(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
>>>>>>> a129cd899dc981819d3e027eb98f6cbbcd072999
