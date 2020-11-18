require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8005;
const app = express();

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connect db ok"))
  .catch((e) => console.log("Have error ", e));

const userRoute = require("./routes/user.route");
const orderRoute = require("./routes/order.route");
const productRoute=require('./routes/product.route');

app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/products",productRoute);

app.listen(PORT, () => {
  console.log(`Server is running is port: ${PORT}`);
});
