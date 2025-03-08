import express from "express";
import dotenv from "dotenv";
import router from './routes/index.js';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
dotenv.config();
const PORT = process.env.PORT;

connectDB();

app.use(cors({
  origin: "http://localhost:5173/",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", router);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
