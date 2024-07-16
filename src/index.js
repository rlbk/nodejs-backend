import express from "express";
import envConfig from "./config/envConfig.js";

const app = express();
const port = envConfig.port;

app.get("/", (req, res) => {
  res.send("Hello Nodejs developer.");
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
