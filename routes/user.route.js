const express = require("express");
const router = express.Router();
const {userController} = require("../controller").userApp;

router.get("/order", userController.list);
router.get("/:id", userController.get);
router.post("/create", userController.create);
router.patch("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);

module.exports = router;