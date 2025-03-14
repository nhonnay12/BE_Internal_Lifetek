import authSwagger from "./auth.js";
import { authSchema } from "./components/authComponent.js";
import { taskSchema } from "./components/taskComponent.js";
import taskSwagger from "./task.js";


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
      ...taskSwagger
    },
    components: {
      schemas: {
        ...authSchema,
        ...taskSchema,
      },
    }
  };

export default swaggerDocs;