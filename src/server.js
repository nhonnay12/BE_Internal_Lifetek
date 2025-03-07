import express from 'express';
import dotenv from "dotenv";
import router from './routes/index.js';
import connectDB from './config/db.js';
const app = express()
dotenv.config();
const PORT = process.env.PORT

connectDB

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})