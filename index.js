const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
const port = 8080;

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Successfull GET CALL",
  });
});

app.post("/post", (req, res) => {
  res.status(200).send({
    message: "Successfull POST CALL",
  });
});

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});
