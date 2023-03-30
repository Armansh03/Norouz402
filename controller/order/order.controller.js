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
    },
    modify : async(req, res) => {
        try {
            const updatedOrder = await orderService.modify(req);
            return res.json(updatedOrder);
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }
    },
    cancel : async(req, res) => {
        try {
            const {id} = req.params;
            const cancelOrder = await orderService.cancel(id);
            return res.json(cancelOrder);
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }
    },
    pay : async(req, res) => {
        try {
            const {id} = req.params;
            const cancelOrder = await orderService.pay(id);
            return res.json(cancelOrder);
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }
    }
}
module.exports = orderController;