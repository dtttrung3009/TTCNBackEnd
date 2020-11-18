const epxress= require('express');
const { getToken, isAdmin,isAuth} = require("../middlewares/auth.middleware");
const orderController= require('../controllers/order.controller');
const router= epxress.Router();

router.get('/',isAuth, orderController.getAll);
router.get('/mine', isAuth, orderController.getOrderUserHave);
router.get('/:id',isAuth,orderController.getOrderById);
router.delete('/:id',isAuth,isAdmin, orderController.deleteOrderById);

router.post('/',isAuth,orderController.createOrder);
router.put('/:id.pay',isAuth, orderController.payOrder);

module.exports=router;