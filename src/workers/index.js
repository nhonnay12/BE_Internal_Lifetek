import { Worker } from "bullmq";
import dotenv from "dotenv";
import { emailQueue } from "../queues/index.js";
import emailTask from "../queues/Tasks/sendMailQueue.js";

dotenv.config();

const connection = {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379, 
};

new Worker(emailQueue.name, emailTask, { connection });