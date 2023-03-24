const db = require("../../db")

function ticketPermittedKey(data) {
    const permitted = ["id", "from_location", "to_location", "arrival_date", "departure_date", "unit_price", "count"];
    let notGiven = [];
    let result = {};
    let flag = 0;
    for (const key of permitted) {
        if (data.hasOwnProperty(key)){
            if (key == "arrival_date" || key == "departure_date")
                result[key] = new Date(data[key]);
            else
                result[key] = data[key];
        }
        else{
            flag = 1
            notGiven.push(key);
        }
    }
    if (flag)
        throw new Error (`All data should be sent. ${notGiven} not given`);
    else
        return result;
}

function modifyPermittedKey(data) {
    const permitted = ["from_location", "to_location", "arrival_date", "departure_date", "unit_price", "count"];
    let result = {};
    for (const key of permitted) {
        if (data.hasOwnProperty(key)){
            if (key == "arrival_date" || key == "departure_date")
                result[key] = new Date(data[key]);
            else
                result[key] = data[key];
        }
    }
    return result;
}

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
                data : ticketPermittedKey(req.body)
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
                        data: modifyPermittedKey(req.body)
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