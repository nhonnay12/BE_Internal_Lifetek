import { getAllTasks,createTasks,updateTaskStatusService,addUserToTaskService } from "../services/taskService.js"

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
    res.status(201).json({ message: 'Task created successfully', task: newTask });
      console.log("success")
     
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/// thay đổi trạng thái 
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const updatedTask = await updateTaskStatusService(taskId, status);

    res.status(200).json({
      message: "Task status updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// thêm user vapf task

export const addUserToTask = async (req, res) => {
  try {
    const { taskId, userId } = req.body;
    
    const updatedTask = await addUserToTaskService(taskId, userId);

    res.status(200).json({
      message: "User added to task successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};