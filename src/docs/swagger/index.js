import authSwagger from "./auth.js";

const swaggerDocs = {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Tài liệu API cho hệ thống",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Môi trường development",
      },
    ],
    paths: {
      ...authSwagger,
    },
  };

export default swaggerDocs;