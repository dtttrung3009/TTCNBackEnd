const { isAdmin, isAuth } = require('../middlewares/auth.middleware');
const orderController = require('../controllers/order.controller');

const express = require('express');
const router = express.Router();

router.put("/:id.pay", isAuth, orderController.pay);

router.post("/", isAuth, orderController.createOrder);

router.delete('/:id', isAuth, isAdmin, orderController.deleteOrder);

router.get('/:id', isAuth, orderController.getOrderById);

router.get('/mine', isAuth, orderController.getMyOrders);

router.get('/',isAuth, orderController.getOrders);

module.exports = router;