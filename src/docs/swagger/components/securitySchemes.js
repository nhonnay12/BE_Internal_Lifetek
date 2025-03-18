const securitySchemes = {
    BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header'
    }
}
export { securitySchemes };