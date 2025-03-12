import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Issue Tracker API",
      version: "1.0.0",
      description: "API quản lý vấn đề",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["D:/di lam/TTS_BACK/BE_Internal_Liftek/src/routes/auth.js","D:/di lam/TTS_BACK/BE_Internal_Liftek/src/routes/taskRoute.js"], // Quét tất cả API từ thư mục routes
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger Docs: http://localhost:5000/api-docs");
};
