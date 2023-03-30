const { errorHandler } = require("../../utils")
const {validationResult} = require("express-validator");
const { orderService } = require("./order.service");

const orderController = {
    create : async (req, res) => {
        try {
            const validationError = validationResult(req).errors;
            if (validationError.length){
                return errorHandler(res, validationError, 400);
            }
            const order = await orderService.create(req.body);
            return res.json(order);
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }
    }
}
module.exports = orderController;