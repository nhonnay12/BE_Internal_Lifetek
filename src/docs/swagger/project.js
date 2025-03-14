const projectSwagger = {
    "/projects": {
        post: {
            summary: "Tạo dự án mới",
            description: "API tạo dự án mới",
            tags: ["Project"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Project"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Dự án tạo thành công",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Project"
                            }
                        }
                    }
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
                                        example: "Tên dự án không được để trống"
                                    }
                                }
                            }
                        }
                    }
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
                                        example: "Internal server error"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        get: {
            summary: "Lấy tất cả dự án",
            description: "API lấy danh sách tất cả dự án",
            tags: ["Project"],
            responses: {
                200: {
                    description: "Danh sách dự án",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Project"
                                }
                            }
                        }
                    }
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
                                        example: "Internal server error"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    "/projects/{id}": {
        get: {
            summary: "Lấy chi tiết dự án theo ID",
            description: "API lấy chi tiết dự án",
            tags: ["Project"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "ID dự án",
                    schema: {
                        type: "string",
                        example: "60d4f6d3c2f2a00015f8a3d5"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Thông tin chi tiết dự án",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Project"
                            }
                        }
                    }
                },
                404: {
                    description: "Dự án không tìm thấy",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Dự án không tìm thấy"
                                    }
                                }
                            }
                        }
                    }
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
                                        example: "Internal server error"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        put: {
            summary: "Cập nhật dự án theo ID",
            description: "API cập nhật thông tin dự án",
            tags: ["Project"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "ID dự án",
                    schema: {
                        type: "string"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Project"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Cập nhật dự án thành công",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Project"
                            }
                        }
                    }
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
                                        example: "Tên dự án không được để trống"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Dự án không tìm thấy",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Dự án không tìm thấy"
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
        },

        delete: {
            summary: "Xoá dự án theo ID",
            description: "API xoá dự án",
            tags: ["Project"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "ID dự án",
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Xoá dự án thành công",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Xoá dự án thành công"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Dự án không tìm thấy",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Dự án không tìm thấy"
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

    "/projects/{id}/manager": {
        get: {
            summary: "Lấy thông tin người quản lý dự án",
            description: "API lấy thông tin người quản lý dự án",
            tags: ["Project"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "ID dự án",
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Thông tin người quản lý dự án",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    manager: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            name: { type: "string" },
                                            email: { type: "string" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Dự án không tìm thấy",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Dự án không tìm thấy"
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
    }
};

export default projectSwagger;
