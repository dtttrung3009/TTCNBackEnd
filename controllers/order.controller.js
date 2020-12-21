const Order = require('../models/order.model');

exports.pay = async (req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment = {
            paymentMethod: "paypal",
            paymentResult: {
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.paymentID
            }
        };
        const updatedOrder = await order.save();
        return res.status(200).send({ msg: "Order paid!", data: updatedOrder });
    }
    return res.status(404).send({ msg: "Error in creating payment!" });
}

exports.createOrder = async (req,res) => {
    const order = new Order({
        user: req.user._id,
        orderItems: req.body.orderItems,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice
    });

    const newOrder = await order.save();
    
    if (newOrder) {
        return res.status(200).send({ msg: "Order successfully saved!", data: newOrder });
    }

    return res.status(500).send({ msg: "Error in creating order!" });
}

exports.deleteOrder = async (req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (order) {
        await order.remove();
        return res.status(200).send({ msg: "Delete order successfully!" });
    }

    return res.status(404).send({msg: 'Order not found!'});
}

exports.getOrderById = async (req, res) => {

    const id = req.params.id;
    const order = await Order.findById(id);

    if (order){
        return res.send(order);
    }
    return res.status(404).send({msg: 'Order not found!'});
}

exports.getMyOrders = async (req, res) => {
    const orders = await Order.findOne({ user: req.user._id });
    return res.send(orders);
}

exports.getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user');
    return res.send(orders);
}