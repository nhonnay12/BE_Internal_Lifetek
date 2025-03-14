const taskSchema = {
    Task: {
        type: "object",
        properties: {
            title: {
                type: "string",
                example: "Tạo API cho hệ thống"
            },
            description: {
                type: "string",
                example: "Tạo API cho hệ thống sử dụng Node.js và Express"
            },
            projectId: {
                type: "string",
                example: "60d4f6d3c2f2a00015f8a3d5"
            },
            assigneeId: {
                type: "string",
                example: "60d4f6d3c2f2a00015f8a3d5"
            },
            status: {
                type: "string",
                example: "pending"
            },
            priority: {
                type: "string",
                example: "medium"
            },
            images: {
                type: "array",
                items: {
                    type: "string",
                    example: "https://via.placeholder.com/150"
                }
            },
            deadlineDate: {
                type: "string",
                example: "2021-06-25T00:00:00.000Z"
            }
        }
    }
}

export { taskSchema };