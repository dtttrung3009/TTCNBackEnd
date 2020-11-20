require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8005;
const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

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
const uploadRoute=require('./routes/uploadRoute');

app.get('/',(req,res)=>{
  res.json({message:"Server ok"});
})
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/products",productRoute);
app.use("/api/uploads",uploadRoute);

app.listen(PORT, () => {
  console.log(`Server is running is port: ${PORT}`);
});
