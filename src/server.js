import express from "express";
import env from "./config/env.js";
import cors from "cors";
import router from "./routes/index.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import swaggerDocs from "./config/swaggerConfig.js";
import { connectRedis } from "./config/redisClient.js";
import ErrorMiddleware from "./middlewares/error.middleware.js";
import listEndpoints from "express-list-endpoints"; // eslint-disable-line
const app = express();
const PORT = env.PORT;

connectDB();
connectRedis();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.11.11:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
swaggerDocs(app);

//middleware xử lý lỗi
app.use(ErrorMiddleware.notFound); // xử lý lỗi 404
app.use(ErrorMiddleware.errorHandle); // xử lý lỗi chung

// console.log(listEndpoints(app)); 


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server đang chạy tại ${process.env.BASE_URL}`);  
});
