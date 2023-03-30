const db = require("../../db")
const {orderMiddleware} = require("../../middlewares")

exports.orderService = {
    create : async(reqBody) => {
        try {
            await db.order.create({
                data : orderMiddleware.orderPermittedKey(reqBody)
            })
            return "Order Added";
        } catch (error) {
            throw new Error(error.message);
        }
    }
}