const express = require("express");
const router = express.Router();
const {ticketController} = require("../controller").ticketApp;
const {ticketMiddleware} = require("../middlewares")

router.get("/order", ticketController.list)
router.get("/:id", ticketController.get);
router.delete("/:id", ticketController.delete);
router.delete("/", ticketController.deleteList);
router.post("/add", ticketMiddleware.ticketCreateValidator , ticketController.create);
router.patch("/modify/:id", ticketController.modify);

module.exports = router;