import authSwagger from "./auth.js";
import { authSchema } from "./components/authComponent.js";
import { taskSchema } from "./components/taskComponent.js";
import { projectSchema } from "./components/projectComponent.js";
import taskSwagger from "./task.js";
import projectSwagger from "./project.js";



const swaggerDocs = {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Tài liệu API cho hệ thống",
    },
    servers: [
      {
        url: `${process.env.DOMAIN_SWAGGER}/api/v1`,
        description: "Môi trường development",
      },
    ],
    paths: {
      ...authSwagger,
      ...taskSwagger,
      ...projectSwagger,
    },
    components: {
      schemas: {
        ...authSchema,
        ...taskSchema,
        ...projectSchema

      },
    }
  };

export default swaggerDocs;