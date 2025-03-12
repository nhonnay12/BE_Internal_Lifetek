import express from "express";
import dotenv from "dotenv";
import { setupSwagger } from "./config/swagger.js";
import router from './routes/index.js';
import connectDB from './config/db.js';

// import projectRoutes from "./routes/projectRoutes.js";
const app = express()
dotenv.config();
const PORT = process.env.PORT;
////

///
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
// Kích hoạt Swagger
setupSwagger(app);
// app.use("/api/projects", projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
