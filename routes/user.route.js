const express = require("express");
const router = express.Router();
const {userController} = require("../controller").userApp;
const {body, validationResult} = require("express-validator")


router.get("/order", userController.list);
router.get("/:id", userController.get);
router.post("/create", body("registration_date").isISO8601(), body("birthday").isISO8601(),userController.create);
router.patch("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);

module.exports = router;