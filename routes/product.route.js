const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { isAdmin, isAuth } = require("../middlewares/auth.middleware");

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProductById);
router.get("/:id/reviews", productController.createReviewProduct);
router.put("/:id", isAuth, isAdmin, productController.updateInfoProduct);
router.delete("/:id", isAuth, isAdmin, productController.deleteProduct);
router.post("/", isAuth, isAdmin, productController.createProduct);

module.exports = router;
