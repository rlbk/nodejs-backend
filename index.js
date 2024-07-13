const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello Nodejs developer.");
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
