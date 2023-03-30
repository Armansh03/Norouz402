const express = require("express");
const router = express.Router();
const {orderController} = require("../controller").orderApp;
const {orderMiddleware} = require("../middlewares")

router.post("/create", orderMiddleware.orderCreateValidator, orderController.create);
router.patch("/modify/:id", orderController.modify);
router.patch("/cancel/:id", orderController.cancel);
router.patch("/pay/:id", orderController.pay);

module.exports = router;