const db = require("../../db")
const {ticketMiddleware} = require("../../middlewares");


exports.ticketService = {
    list : async () => {
        try {
            const tickets = await db.ticket.findMany()
            return tickets;            
        } catch (error) {
            throw new Error(error.message)
        }
    },
    getByID : async(id) => {
        try {
            const ticket = await db.ticket.findUnique({
                where: {id: id}
            })
            if (!ticket)
                return "Ticket doesn't exist"
            else
                return ticket;
        } catch (error) {
            throw new Error(error.message)
        }
    },
    delete : async (id) => {
        try {
            const ticket = await db.ticket.findUnique({
                where: {id : id}
            })
            if (!ticket)
                return `Ticket ${id} doesn't exist`;
            else{
                try {
                    const ticketDelete = await db.ticket.delete({
                        where : {id : id}
                    });
                    return `ticket ${id} removed`;
                } catch (error) {
                    throw new Error(error.message);
                }
            }
            
        } catch (error) {
            throw new Error (error.message);
        }
    },
    deleteList : async function (ids) {
        try {
            let ans = "";
            for (const id in ids) {
                ans += "\\\\";//???????????????????
                ans += await this.delete(ids[id]);
            }
            return ans;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    create : async(req) => {
        try {
            await db.ticket.create({
                data : ticketMiddleware.ticketPermittedKey(req.body)
            })          
            return "Ticket added";
        } catch (error) {
            throw new Error(error.message);
        }

    },
    modify : async(req) => {
        try{
            const {id} = req.params;
            const ticket = await db.ticket.findUnique({
                where : {id : id}
            })
            if (!ticket)
                return "Ticket doesn't exist"
            else{
                try {
                    const modifiedTicket = await db.ticket.update({
                        where: {id : id},
                        data: ticketMiddleware.ticketPermittedKey(req.body)
                    })
                    return "Ticket modified";                
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        }catch{
            throw new Error(error.message);
        }
    } 
}