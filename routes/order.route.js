const express = require("express");
const router = express.Router();
const {orderController} = require("../controller").orderApp;
const {orderMiddleware} = require("../middlewares")

router.post("/create", ...orderMiddleware.orderCreateValidator, orderController.create);

module.exports = router;