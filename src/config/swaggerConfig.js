import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import path from "path";
import YAML from "yamljs";

// Tạo __dirname trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load file YAML
const swaggerDocument = YAML.load(path.join(__dirname, "../docs/index.yaml"));

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;
