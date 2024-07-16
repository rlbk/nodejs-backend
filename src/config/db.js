import mongoose from "mongoose";
import envConfig from "./envConfig.js";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${envConfig.databaseUrl}/${DB_NAME}`
    );
    console.log(`DB connected. DB Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("DB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
