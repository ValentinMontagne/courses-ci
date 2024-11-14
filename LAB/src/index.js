const express = require("express");
const auth = require("./modules/authentication");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/auth/:secret", (req, res) => {
  const { secret } = req.params;
  const response = auth(secret);
  //test cool
  res.status(response.status).send(response.message);
});

app.listen(port, () => {

  console.log(`Example app listening on http://localhost:${port}`);
});
