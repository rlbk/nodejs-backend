import express from "express";
import envConfig from "./config/envConfig.js";
import connectDB from "./config/db.js";

const app = express();
const port = envConfig.port;

app.get("/", (req, res) => {
  res.send("Hello Nodejs developer.");
});

connectDB();

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
