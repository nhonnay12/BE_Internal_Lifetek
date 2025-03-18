const userSwagger = {
    "/user": {
        get: {
            tags: ["User"],
            summary: "Lấy thông tin người dùng",
            security:
                [
                    {
                        BearerAuth: []
                    }
                ],
            responses: {
                200: {
                    description: "Thành công",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
                            }
                        }
                    }
                },
                401: {
                    description: "Token không hợp lệ"
                },
                403: {
                    description: "Không có quyền truy cập"
                },
                500: {
                    description: "Lỗi server"
                }
            }
        }
    },
    "/user/getAll": {
        get: {
            tags: ["User"],
            summary: "Lấy thông tin tất cả người dùng",
            security:
                [
                    {
                        BearerAuth: []
                    }
                ],
            responses: {
                200: {
                    description: "Thành công",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/User"
                                }
                            }
                        }
                    }
                },
                403: {
                    description: "Không có quyền truy cập"
                },
                500: {
                    description: "Lỗi server"
                }
            },
        }
    },
    "/user/update-profile": {
        put: {
            tags: ["User"],
            summary: "Cập nhật thông tin người dùng",
            security:
                [
                    {
                        BearerAuth: []
                    }
                ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                avatar: {
                                    type: "string",
                                    format: "binary",
                                    description: "Ảnh đại diện",
                                },
                                userName: {
                                    type: "string",
                                    example: "Nguyễn Văn B",
                                },
                                phone: {
                                    type: "string",
                                    example: "0123456789"
                                },
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Thành công",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
                            }
                        }
                    }
                },
                401: {
                    description: "Token không hợp lệ"
                },
                403: {
                    description: "Không có quyền truy cập"
                },
                500: {
                    description: "Lỗi server"
                }
            }
        }
    }
};

export { userSwagger };