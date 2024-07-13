const express = require("express");
const envConfig = require("./config/envConfig");
const app = express();
const port = envConfig.port;

app.get("/", (req, res) => {
  res.send("Hello Nodejs developer.");
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
