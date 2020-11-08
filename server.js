const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8005;
const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost/ttcnbackend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connect db ok"))
  .catch((e) => console.log("Have error ", e));

app.listen(PORT, () => {
  console.log(`Server is running is port: ${PORT}`);
});
