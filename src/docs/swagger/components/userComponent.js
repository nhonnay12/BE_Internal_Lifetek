const userSchema = {
    User: {
        type: 'object',
        properties: {
            userName: {
                type: 'string',
                example: 'Nguyễn Văn A'
            },
            email: {
                type: 'string',
                example: 'example@gmail.com'
            },
            image: {
                type: "string",
                example: "https://res.cloudinary.com/duykd/image/upload/v1630380241/2021-08-31T09:10:41",
            },
            phone: {
                type: 'string',
                example: '0123456789'
            },
            verified: {
                type: 'boolean',
                example: true
            },
            role: {
                type: 'string',
                example: 'USER'
            }
        }

    }
}

export { userSchema };