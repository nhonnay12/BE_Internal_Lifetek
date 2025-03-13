import express from "express";
import dotenv from "dotenv";
import router from './routes/index.js';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectRedis } from "./config/redisClient.js";
import swaggerDocs  from "./config/swaggerConfig.js";


const app = express()
dotenv.config();
const PORT = process.env.PORT;

connectDB();
connectRedis();

app.use(cors({
  origin: ["http://localhost:5173", "http://192.168.1.103:5173"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

swaggerDocs (app);

// app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server đang chạy tại http://192.168.-1.103:${PORT}`);
});
