const taskSwagger = {
    "/tasks/create-task" : {
        post: {
            summary: "Tạo nhiệm vụ mới",
            description: "API tạo nhiệm vụ mới",
            tags: ["Task"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Task",
                        },
                    },
                }
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
            }
        }
    },
    "/tasks/edit-task/{id}" : {
        put: {
            summary: "chỉnh sửa nhiệm vụ",
            description: "API chỉnh sửa nhiệm vụ",
            tags: ["Task"],
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
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Task",
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
        }
    },
    
    "/task": {
        get: {
            summary: 'Lấy danh sách tất cả công việc',
            description: 'Trả về danh sách các công việc trong hệ thống',
            tags: ['Task'],
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
             
               
            },
        }
        
      }
        
     
}

export default taskSwagger;