import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectionString = process.env.MONGO_URL;
export const connectToDatabase = async () => {
  const urls = connectionString;
  await mongoose.connect(urls);
  console.log("Connected to database");
};
