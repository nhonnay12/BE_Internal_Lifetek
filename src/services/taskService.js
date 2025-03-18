import Task from "../models/Task.js";
import User from "../models/User.js"
import mongoose from "mongoose";

export const updateTaskStatusService = async (taskId, newStatus) => {
  // Kiểm tra xem taskId có hợp lệ không
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error(" task ID không phù hợp");
  }

  // Kiểm tra trạng thái hợp lệ
  const validStatuses = ["pending", "inProgress", "completed", "done"];
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
};

/// thêm user vào task

export const addUserToTask = async (taskId, userId) => {
  const listUserId = await User.find({ _id: { $in: userId } }).distinct("_id");
  console.log(listUserId)
  if (listUserId.length === 0) {
    throw new Error("Danh sách người dùng thêm vào không tồn tại trong bảng người dùng");
  }
  else if (listUserId.length === 1) {
      const task = await Task.findById(taskId);
      if (!task) {
        throw new Error("Task không tìm thấy");
    }  
    // Lấy danh sách userId đã tồn tại trong assigneeId
    const existingUsers = task.assigneeId.map(id => id.toString());

    // Kiểm tra xem có userId nào bị trùng không
    const duplicateUsers = listUserId.filter(id => existingUsers.includes(id));
    if (duplicateUsers.length > 0) {
        throw new Error(`UserId bị trùng: ${duplicateUsers.join(", ")}. Vui lòng chọn user khác.`);
    }
   const newUsers = listUserId.map(id => new mongoose.Types.ObjectId(id));

    const result = await Task.findByIdAndUpdate(
        taskId,
        { $addToSet: { assigneeId: { $each: newUsers } } },
        { new: true }
    );
    return result
  }

  else if ((listUserId.length > 1)){
      const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { $set: { assigneeId: listUserId.map(id => new mongoose.Types.ObjectId(id))  } }, // Dùng $addToSet để tránh trùng lặp
    { new: true }, { assigneeId: 1 }
  );// Populate để lấy chi tiết user nếu cần

  if (!updatedTask) {
    throw new Error("Task không tìm thấy");
  }

    return updatedTask;
  }
  
}
  
////
export const filterTaskService = async (data) => {
  try {
    const task = await Task.find(data);
    return task;
  } catch (error) {
    console.log(error);
  }
};
export const getAllTasks = async () => {
  return await Task.find().select("+assigneeId +assignerId").populate("assigneeId", "userName email");
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
};
export const FindTaskById = async (id) => {
  return await Task.findById(id).populate({
    path: "assigneeId",
    select: "userName email", // Chỉ laý user name và email của user
  });
};

// export const FindTaskByTitle = async (data) => {
//   return await Task.find({ title: { $regex: data, $options: "i" } });
// };
export const convertToSlug = (str) => {
  return str
    .normalize("NFD") // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D") // Chuyển đ -> d, Đ -> D
    .replace(/[^a-zA-Z0-9\s]/g, "") // Xóa ký tự đặc biệt (chỉ giữ chữ & số)
    .trim() // Xóa khoảng trắng đầu & cuối
    .replace(/\s+/g, " "); // Chuyển nhiều khoảng trắng thành 1 khoảng trắng
};

export const FindTaskByTitle = async (data) => {
  const slugTitle = convertToSlug(data); // Chuyển input thành không dấu

  return await Task.find({
    $or: [
      { title: { $regex: new RegExp(`.*${data}*`, "i") } }, // Tìm kiếm một phần của chuỗi có dấu
      { title: { $regex: new RegExp(`.*${slugTitle}*`, "i") } }, // Tìm kiếm một phần của chuỗi không dấu
    ],
  });
};
// check assigneeID có trong bảng user không
export const checkAssigneeId = async (assigneeId) => {
  return await User.find({ _id: { $in: assigneeId } });
}

// check assignerId có trong bảng user không
export const checkAssignerId = async (assignerId) => {
  return await User.findById(assignerId);
}