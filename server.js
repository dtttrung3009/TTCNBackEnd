const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const uploadRoute = require('./routes/upload.route');
const orderRoute = require('./routes/order.route');
const config = require('./middlewares/config.middleware');

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {console.log("Database connected!!!")})
    .catch(error => console.log("Cannot connect to database!"));

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/uploads", uploadRoute);
app.use("/api/orders", orderRoute);

app.listen(5000, () => {console.log("Server started at http://localhost:5000")});
