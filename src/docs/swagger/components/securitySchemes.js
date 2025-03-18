const securitySchemes = {
    BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
    }
}
export { securitySchemes };