const projectSchema = {
    Project: {
        type: "object",
        properties: {
            name: {
                type: "string",
                example: "Dự án phát triển hệ thống CRM"
            },
            code: {
                type: "number",
                example: 123456
            },
            description: {
                type: "string",
                example: "Dự án phát triển hệ thống CRM hỗ trợ quản lý khách hàng"
            },
            status: {
                type: "number",
                example: 0
            },
            managerId: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",
                        example: "60d4f6d3c2f2a00015f8a3d5"
                    },
                    userName: {
                        type: "string",
                        example: "Nguyễn Văn A"
                    },
                    email: {
                        type: "string",
                        example: "example@gmail.com",
                    },
                    phone: {
                        type: "string",
                        example: "0123456789"
                    },
                    avatar: {
                        type: "string",
                        example: "https://res.cloudinary.com/dxl1gsy3h/image/upload/v1742280198/uploads/ux92oetku5b4lugmnq20.jpg"
                    }
                }
            },
            members: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "60d4f6d3c2f2a00015f8a3d5"
                        },
                        userName: {
                            type: "string",
                            example: "Nguyễn Văn A"
                        },
                        email: {
                            type: "string",
                            example: "example@gmail.com",
                        },
                        phone: {
                            type: "string",
                            example: "0123456789"
                        },
                        avatar: {
                            type: "string",
                            example: "https://res.cloudinary.com/dxl1gsy3h/image/upload/v1742280198/uploads/ux92oetku5b4lugmnq20.jpg"
                        }
                    }
                }
            },
            priority: {
                type: "number",
                example: 0
            },
        }
    }
};

export { projectSchema };
