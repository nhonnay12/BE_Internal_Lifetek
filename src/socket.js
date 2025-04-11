const { Server } = require("socket.io");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // Chỉ định frontend được phép kết nối
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 User Connected: ${socket.id}`);

    // Gửi thông báo định kỳ
    // setInterval(() => {
    //     const msg = `📢 Thông báo lúc ${new Date().toLocaleTimeString()}`;
    //     socket.emit('server_notification', msg);
    // }, 10000);
    // Nhận sự kiện từ client
    socket.on("joinRoom", (userId) => {
      socket.join(userId); // User tham gia room theo ID của họ
    });

    // Xử lý khi user ngắt kết nối
    socket.on("disconnect", () => {
      console.log(`❌ User Disconnected: ${socket.id}`);
    });
  });
}

function sendNotification(userId, message) {
  if (io) {
    io.to(userId).emit("notification", message); // Gửi thông báo real-time đến user
  }
}

module.exports = { initSocket, sendNotification };
