import dotenv from "dotenv";

dotenv.config();

export const env = {
  host: process.env.HOST ?? "0.0.0.0",
  port: Number(process.env.PORT ?? 3333),
  mongodbUri:
    process.env.MONGODB_URI ??
    "mongodb://root:root@localhost:27018/webscraping?authSource=admin",
  sessionSecret:
    process.env.SESSION_SECRET ??
    "development-session-secret-change-me-32-chars"
};
