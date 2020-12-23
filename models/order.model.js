const mongoose = require("mongoose");

const shippingObject = {
  street: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
};

const paymentObject = {
  payment: { type: String, required: true },
};

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product",
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [orderItemSchema],
    shipping: shippingObject,
    payment: paymentObject,
    itemsPrice: { type: Number },
    // taxPrice: { type: Number },
    // shippingPrice: { type: Number },
    // totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
