const db = require("../../db")
const {orderMiddleware} = require("../../middlewares")

exports.orderService = {
    create : async(reqBody) => {
        try {
            const order = orderMiddleware.orderPermittedKey(reqBody)
            const user = await db.user.findUnique({
                where : {id : order.user_id}
            })
            const ticket = await db.ticket.findUnique({
                where : {id : order.ticket_id}
            })
            if (!user)
                return "UserId doesn't exist";
            if (!ticket)
                return "Ticket doesn't exist";
            console.log(user);
            await db.order.create({
                data : order
            })
            return "Order Added";
        } catch (error) {
            throw new Error(error.message);
        }
    }
}