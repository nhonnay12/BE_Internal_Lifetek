const notifiSchema = {
  Notifi: {
    type: "object",
    properties: {
      userId: {
        type: "string",
        example: "67d4f3db634221ef464d71e5",
      },
      projectId: {
        type: "string",
        example: "67d8dde4edc970e80f2ed0ae",
      },
      taskId: {
        type: "string",
        example: "67e4e5373a08dddbad08b81e",
      },
     
      message: {
        type: "string",
        example: "Bạn đã được thêm vào task: Fix login bug",
        },
      isRead: {
        type: "bolean",
        example: "false",
        },
    },
  },
};

module.exports = {notifiSchema};
