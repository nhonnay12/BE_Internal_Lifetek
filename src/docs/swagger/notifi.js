const notifiSwagger = {
    "/notifi": {
      get: {
        summary: "Lấy danh sách tất cả công việc",
        description: "Trả về danh sách các công việc trong hệ thống",

        tags: ["Notifi"],
        parameters: [
          {
            in: "query",
            name: "page",
            required: false,
            description: "Phân trang hiện tại",
            schema: {
              type: "number",
              example: 1,
            },
          },
          {
            in: "query",
            name: "limit",
            required: false,
            description: "Số lượng hiển thị",
            schema: {
              type: "number",
              example: 10,
            },
          },
        ],
        responses: {
          200: {
            description: "Lấy danh sách thông báo thành công",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Notifi",
                },
              },
            },
          },
          500: {
            description: "Lỗi phía server",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Internal server error",
                    },
                  },
                },
              },
            },
          },
        },
      },
  },
}

module.exports = notifiSwagger;