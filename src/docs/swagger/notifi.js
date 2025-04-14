const { get } = require("mongoose");

const notifiSwagger = {
    "/notifi": {
      get: {
        summary: "Lấy tất cả thông báo của người dùng",
        description: "Trả về danh sách các thông báo trong hệ thống",

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
  "/notifi/{id}": {
     delete: {
      summary: "Xoá thông báo theo ID",
      description: "API xoá thông báo",
      tags: ["Notifi"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID notifi",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Xoá thông báo thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Xoá thông báo thành công",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Không tìm thấy thông báo",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Không tìm thấy thông báo",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Lỗi server",
        },
      },
    },
     put: {
      summary: "Xoá thông báo theo ID",
      description: "API xoá thông báo",
      tags: ["Notifi"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID notifi",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Xoá thông báo thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Xoá thông báo thành công",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Không tìm thấy thông báo",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Không tìm thấy thông báo",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Lỗi server",
        },
      },
    },
  }
  
}

module.exports = notifiSwagger;