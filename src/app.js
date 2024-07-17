import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import envConfig from "./config/envConfig.js";
import userRouter from "./routes/user.routes.js";

const app = express();

// middlewares
app.use(
  cors({
    origin: envConfig.corsOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: "true", limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
app.use("/api/v1/users", userRouter);

export { app };
