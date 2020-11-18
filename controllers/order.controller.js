const Order = require("../models/order.model");
const { getToken, isAdmin } = require("../middlewares/auth.middleware");
module.exports = {
  getAll: async (req, res, next) => {
    const orders = await Order.find({}).populate("user");
    res.send(orders);
  },
  getOrderUserHave: async (req, res, next) => {
    const orders = await Order.find({ user: req.user_id });
    res.send(orders);
  },
  getOrderById: async (req, res, next) => {
    const order = await Order.findOne({ _id: req.paems.id });
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order Not Found");
    }
  },
  deleteOrderById: async (req, res, next) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      const deleteOrder = await order.remove();
      res.send(deleteOrder);
    } else {
      res.status(404).send("Order not found");
    }
  },
  createOrder: async (req, res, next) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    res
      .status(201)
      .send({ message: "New order created", data: newOrderCreated });
  },
  payOrder: async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.payment = {
        paymentMethod: "paypal",
        paymentResult: {
          payerID: req.body.payerID,
          orderID: req.body.orderID,
          paymentID: req.body.paymentID,
        },
      };
      const updatedOrder = await order.save();
      res.send({ message: "Order Paid.", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order not found." });
    }
  },
};
