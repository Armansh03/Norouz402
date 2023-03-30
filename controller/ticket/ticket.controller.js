const { errorHandler } = require("../../utils");
const {ticketService} = require("./ticket.service");
const {validationResult} = require("express-validator")

const ticketController = {
    list : async (req, res) => {
        try {
            console.log("Sssssssssssssssssssssss");
            const tickets = await ticketService.list()
            return res.json(tickets)            
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }
    },
    get : async (req, res) => {
        try {
            const {id} = req.params;
            console.log(req.query);
            const ticket = await ticketService.getByID(id);
            return res.json(ticket);
        } catch (error) {
            return errorHandler(res, error.message, 500)
        }
    },
    delete: async(req, res) =>{
        try {
            const {id} = req.params;
            const ticket = await ticketService.delete(id);
            return res.json(ticket);
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }
    },
    deleteList : async(req, res) => {
        try {
            const ids = req.query;
            const ticket = await ticketService.deleteList(ids);    
            return res.json(ticket);        
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }
    },
    create : async(req, res) => {
        try {
            const validationError = validationResult(req).errors;
            if (validationError.length){
                return errorHandler(res, validationError, 400);
            }
            const ticketAdd = await ticketService.create(req);
            return res.json(ticketAdd)            
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }

    },
    modify : async(req, res) => {
        try {
            const updateTicket = await ticketService.modify(req);
            return res.json(updateTicket);
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }
    }
}

module.exports = ticketController;