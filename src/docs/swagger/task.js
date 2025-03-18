const taskSwagger = {
  "/tasks/create-task": {
    post: {
      summary: "Tạo nhiệm vụ mới",
      security: [
        {
          $ref: "#/components/securitySchemes/BearerAuth",
        },
      ],
      description: "API tạo nhiệm vụ mới",
      tags: ["Task"],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Fix login bug",
                },
                description: {
                  type: "string",
                  example: "Fix login bug",
                },
                assigneeId: {
                  type: "array",
                  description: "ID người được giao nhiệm vụ",
                  items: {
                    type: "string",
                    example: "65f123abc123abcd12345678",
                  },
                },
                assignerId: {
                  type: "string",
                  example: "65f456def456defg45678901",
                },
                startDate: {
                  type: "string",
                  example: "2024-03-10",
                },
                endDate: {
                  type: "string",
                  example: "2024-03-15",
                },
                projectId: {
                  type: "string",
                  example: "60d4f6d3c2f2a00015f8a3d5",
                },
                status: {
                  type: "string",
                  example: "pending",
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "Ảnh của task"
                },
              },
            }
          }
        },
      },
      responses: {
        201: {
          description: "Nhiệm vụ tạo thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        400: {
          description: "Lỗi dữ liệu đầu vào",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Tiêu đề không được để trống",
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
  "/tasks/edit-task/{id}": {
    put: {
      summary: "chỉnh sửa nhiệm vụ",
      description: "API chỉnh sửa nhiệm vụ",
      tags: ["Task"],
      security: [
        {
          $ref: "#/components/securitySchemes/BearerAuth",
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID nhiệm vụ",
          schema: {
            type: "string",
            example: "60d4f6d3c2f2a00015f8a3d5",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Fix login bug",
                },
                description: {
                  type: "string",
                  example: "Fix login bug",
                },
                assigneeId: {
                  type: "array",
                  items: {
                    type: "string",
                    example: "65f123abc123abcd12345678",
                  },
                  description: "ID người được giao nhiệm vụ",
                },
                assignerId: {
                  type: "string",
                  example: "65f456def456defg45678901",
                },
                startDate: {
                  type: "string",
                  example: "2024-03-10",
                },
                endDate: {
                  type: "string",
                  example: "2024-03-15",
                },
                projectId: {
                  type: "string",
                  example: "60d4f6d3c2f2a00015f8a3d5",
                },
                status: {
                  type: "string",
                  example: "pending",
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "Ảnh của task"
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Nhiệm vụ chỉnh sửa thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        400: {
          description: "Lỗi dữ liệu đầu vào",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Tiêu đề không được để trống",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Nhiệm vụ không tìm thấy",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Nhiệm vụ không tìm thấy",
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

  "/tasks": {
    get: {
      summary: "Lấy danh sách tất cả công việc",
      description: "Trả về danh sách các công việc trong hệ thống",
      tags: ["Task"],

      responses: {
        200: {
          description: "Lấy danh sách vấn đề thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
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
  "/tasks/{id}": {
    get: {
      summary: "Lấy thông tin chi tiết",
      description: "Trả về thống tin chi tiết của task",

      tags: ["Task"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID task",
          schema: {
            type: "string",
            example: "67d3f68ec0587825d1b151bb",
          },
        },
      ],
      responses: {
        200: {
          description: "Lấy thống tin chi tiết task thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        404: {
          description: "Khoông tìm thấy task",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Task not found",
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
  "/tasks/{taskId}/status": {
    put: {
      summary: "Cập nhật trạng thái công việc",
      description: "Trả về  công việc đã thay đổi trạng thái trong hệ thống",
      tags: ["Task"],
      parameters: [
        {
          in: "path",
          name: "taskId",
          required: true,
          description: "ID nhiệm vụ",
          schema: {
            type: "string",
            example: "67d3f68ec0587825d1b151bb",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: { status: "completed" },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Thay đổi trạng thái vấn đề thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        400: {
          description: "Lỗi phía server",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "task ID không phù hợp",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Lỗi phía server",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Không thấy task hợp lệ",
                  },
                },
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
  "/tasks/{taskId}/add-user": {
    post: {
      summary: "Thêm người dùng vào vấn đề",
      description: "Trả về công việc đã thêm người dùng trong hệ thống",
      tags: ["Task"],
      parameters: [
        {
          in: "path",
          name: "taskId",
          required: true,
          description: "ID nhiệm vụ",
          schema: {
            type: "string",
            example: "67d3f68ec0587825d1b151bb",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: { userId: ["60d4f6d3c2f2a00015f8a3d6"] },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Thêm người dùng vào vấn đề thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        400: {
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
        // 404: {
        //     description: "Lỗi phía server",
        //     content: {
        //         "application/json": {
        //             schema: {
        //                 type: "object",
        //                 properties: {
        //                     message: {
        //                         type: "string",
        //                         example: "Không thấy task hợp lệ",
        //                     },
        //                 },
        //             },
        //         },
        //     },
        // },
        // 500: {
        //     description: "Lỗi phía server",
        //     content: {
        //         "application/json": {
        //             schema: {
        //                 type: "object",
        //                 properties: {
        //                     message: {
        //                         type: "string",
        //                         example: "Internal server error",
        //                     },
        //                 },
        //             },
        //         },
        //     },
        // }
      },
    },
  },
  
  "/tasks/project/{projectId}": {
    get: {
      summary: "Lấy danh sách công việc theo dự án",
      description: "Trả về danh sách công việc theo dự án",
      tags: ["Task"],
      parameters: [
        {
          in: "path",
          name: "projectId",
          required: true,
          description: "ID dự án",
          schema: {
            type: "string",
            example: "60d4f6d3c2f2a00015f8a3d5",
          },
        },
      ],
      responses: {
        200: {
          description: "Lấy danh sách công việc theo dự án thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
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

  "/tasks/delete-task/{id}": {
     delete: {
            summary: "Xoá vấn đề theo ID",
            description: "API xoá dự án",
            tags: ["Task"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "ID task",
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Xoá vấn đề thành công",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Xoá vấn đề thành công"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Không tìm thấy vấn đề",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Không tìm thấy vấn đề"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Lỗi server"
                }
            }
        }
  },

  "/tasks/search": {
    get: {
      sunmary: "Tìm kiếm công việc theo Title , (người dùng nhập)",
      description: "Trả về danh sách công việc theo Title",
      tags: ["Task"],
      parameters: [
        {
          in: "query",
          name: "search",
          required: true,
          description: "Tìm kiếm công việc theo Title",
          schema: {
            type: "string",
            example: "Tạo API cho hệ thống",
          },
        },
      ],
      responses: {
        200: {
          description: "Lấy danh sách công việc theo Title",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
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
  "/tasks/filter/{projectId}": {
    post: {
      summary: "Tìm kiếm công việc",
      description: "Trả về công việc có thông tin tìm kiếm tương thích",
      tags: ["Task"],
      parameters: [
        {
          in: "path",
          name: "projectId",
          required: true,
          description: "ID project",
          schema: {
            type: "string",
            example: "67d24709bf0422c295e3f5a7",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: {
                assigneeId: "60d4f6d3c2f2a00015f8a3d5",
                assignerId: "60d4f6d3c2f2a00015f8a3d5",
                startDate: "2021-06-25T00:00:00.000Z",
                endDate: "2021-06-02T00:00:00.000Z",
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Trả về vấn đề có thông tin tìm kiếm tương thích",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        400: {
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
      }
    },
  }


};

export default taskSwagger;
