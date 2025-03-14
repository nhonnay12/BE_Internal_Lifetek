const authSchema = {
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
            phone: {
                type: 'string',
                example: '0123456789'
            },
            password: {
                type: 'string',
                example: '123456'
            },
            verified: {
                type: 'boolean',
                example: false
            },
            role: {
                type: 'string',
                example: 'USER'
            }
        }

    }
}

export { authSchema };