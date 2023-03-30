const express = require("express");
const router = express.Router();
const {orderController} = require("../controller").orderApp;
const {orderMiddleware} = require("../middlewares")

console.log("ssssssssss", orderMiddleware);
router.post("/create", orderMiddleware.orderCreateValidator, orderController.create);

console.log("FFFFFFFFFFFFFFFFFFFFFFFF");
module.exports = router;