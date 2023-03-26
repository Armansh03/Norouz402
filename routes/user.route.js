const express = require("express");
const router = express.Router();
const {userController} = require("../controller").userApp;
const {userValidator} = require("../validator")

router.get("/order", userController.list);
router.get("/:id", userController.get);
router.post("/create", userValidator.userCreateValidator, userController.create);
router.patch("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);
router.post("/login", userController.login)

module.exports = router;