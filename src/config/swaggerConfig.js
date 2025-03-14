import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../docs/swagger/index.js";


// Cấu hình Swagger
const options = {
    definition: swaggerDocs,
    apis: [],
};

// Khởi tạo Swagger
const swaggerSpec = swaggerJsdoc(options);

export default (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};