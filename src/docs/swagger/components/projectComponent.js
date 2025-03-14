const projectSchema = {
    Project: {
        type: "object",
        properties: {
            name: {
                type: "string",
                example: "Dự án phát triển hệ thống CRM"
            },
            description: {
                type: "string",
                example: "Dự án phát triển hệ thống CRM hỗ trợ quản lý khách hàng"
            },
            // startDate: {
            //     type: "string",
            //     example: "2024-03-01T00:00:00.000Z"
            // },
            // endDate: {
            //     type: "string",
            //     example: "2024-06-30T00:00:00.000Z"
            // },
            managerId: {
                type: "string",
                example: "60d4f6d3c2f2a00015f8a3d5"
            },
            status: {
                type: "string",
                example: "todo"
            },
            priority: {
                type: "string",
                example: "high"
            },
            members: {
                type: "array",
                items: {
                    type: "string",
                    example: "60d4f6d3c2f2a00015f8a3d5"
                }
            }
        }
    }
};

export { projectSchema };
