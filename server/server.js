const express = require("express");
const port = 8080;

const app = express();

app.get("/", (req, res) => {
  res.send("HELLO!");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
