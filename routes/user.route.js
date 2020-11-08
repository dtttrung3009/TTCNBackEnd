const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/register", userController.register);
router.post("/signin", userController.signin);
router.get("/createAdmin", userController.createAdmin);
