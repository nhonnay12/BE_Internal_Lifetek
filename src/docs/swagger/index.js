import authSwagger from "./auth.js";
import { authSchema } from "./components/authComponent.js";
import { taskSchema } from "./components/taskComponent.js";
import { projectSchema } from "./components/projectComponent.js";
import taskSwagger from "./task.js";
import projectSwagger from "./project.js";
import dotenv from "dotenv";
import { userSwagger } from "./user.js";
import CmtSwagger from "./comment.js";
import commentSchema from "./components/commentComponent.js";
dotenv.config();

const domainUrl = process.env.DOMAIN_SWAGGER
  ? process.env.DOMAIN_SWAGGER + ":" + process.env.PORT + "/api/v1"
  : `http://localhost:${process.env.PORT}/api/v1`;

const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Tài liệu API cho hệ thống",
  },
  servers: [
    {
      url: domainUrl,

      description: "Môi trường development",
    },
  ],
  paths: {
    ...authSwagger,
    ...taskSwagger,
    ...projectSwagger,
    ...userSwagger,
    ...CmtSwagger,
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ...authSchema,
      ...taskSchema,
      ...projectSchema,
      ...commentSchema,
    },
  },
  // security: [
  //   {
  //     BearerAuth: [], // Kích hoạt xác thực toàn bộ API
  //   },
  // ],
};

export default swaggerDocs;
