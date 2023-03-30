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
    },
    modify : async(req) => {
        try {
            const {id} = req.params;
            const order = await db.order.findUnique({
                where : {id : id}
            })
            if (!order)
                return "Order doesn't exist";
            await db.order.update({
                where : {
                    id : id
                },
                data : orderMiddleware.orderPermittedKey(req.body, 1)
            })
            return "Updated";
        } catch (error) {
            throw new Error(error.message);
        }
    },
    cancel : async(id) => {
        try {
            const order = await db.order.findUnique({
                where : {id : id}
            })
            if (!order)
                return "Order doesn't exist"
            await db.order.update({
                where : {id : id},
                data : {
                    status : "canceled"
                }
            })
            return "Canceled";
        } catch (error) {
            throw new Error(error.message);
        }
    },
    pay : async(id) => {
        try {
            const order = await db.order.findUnique({
                where : {id : id}
            })
            if (!order)
                return "Order doesn't exist"
            await db.order.update({
                where : {id : id},
                data : {
                    status : "paid"
                }
            })
            return "Paid";
        } catch (error) {
            throw new Error(error.message);
        }
    }
}