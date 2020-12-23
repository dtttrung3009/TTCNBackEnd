const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.post("/register", userController.register);
router.post("/signin", userController.signin);
router.get("/createAdmin", userController.createAdmin);
router.put("/:id", isAuth, userController.changeInforUser);
module.exports = router;
