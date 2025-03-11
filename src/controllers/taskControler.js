import { getAllTasks,createTasks,updateTaskStatusService,addUserToTask } from "../services/taskService.js"

export const getAllTask = async (req,res) => {
   try {
    const tasks = await getAllTasks();
    res.status(200).json({
      status: 'success',
      message: 'Lấy danh sách vấn đề thành công!',
      data: tasks,
     });
     console.log("get task")
  } catch (error) {
     res.status(500).json({
       status: 'error',
       message: 'Lỗi khi lấy danh sách vấn đề',
       error: error.message,
     });
  }
} 

export const createTask = async (req,res) => {
  try {
     
      const newTask = await createTasks(req.body);
    res.status(201).json({ message: 'Tạo vấn đề thành công', task: newTask });
      
     
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/// thay đổi trạng thái 
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const updatedTask = await addUserToTask(taskId, status);

    res.status(200).json({
      message: "Thay đổi trạng thái vấn đề thành công",
      task: updatedTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// thêm user vào task

export const addUserToTaskController = async (req, res) => {
  try {
    const { taskId, userId } = req.body;
    
    const updatedTask = await addUserToTask(taskId, userId);

    res.status(200).json({
      message: "Thêm người dùng vào vấn đề thành công",
      task: updatedTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};