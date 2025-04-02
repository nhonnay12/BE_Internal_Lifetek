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
            name: "pageSize",
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
  "/notifi/{userId}": {
    get: {
      summary: "Lấy thông tin chi tiết",
      description: "Trả về thống tin chi tiết của task",
      tags: ["Notifi"],
      parameters: [
        {
          in: "path",
          name: "userId",
          required: true,
          description: "Id user",
          schema: {
            type: "string",
            example: "67d4f3db634221ef464d71e5",
          },
        },
      ],
      responses: {
        200: {
          description: "Lấy thông báo của một người dùng",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Notifi",
              },
            },
          },
        },
        404: {
          description: "Khoông tìm thấy thông báo",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "notifi not found",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Lỗi server",
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