const {userService} = require("./user.service")
const {errorHandler} = require("../../utils");
const {validationResult} = require("express-validator")
const bcrypt = require("bcrypt");

const userController = {

    get: async (req, res) => {
            try {
                const {id} = req.params;
                const user = await userService.getByID(id);
                return res.json(user);
            } catch (error) {
                return errorHandler(res, error.message, 500)
            }
    },
    list: async (req, res) => {
        try {
            const userList = await userService.list();
            return res.json(userList);
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }
    },
    create: async(req, res) => {
        try {
            const {password} = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const validationError = validationResult(req).errors;
            if (validationError.length){
                return errorHandler(res, validationError, 400);
            }
            const userCreate = await userService.create({...req.body, password : hashedPassword});
            return res.json(userCreate);
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }
    },
    update: async(req, res) => {
        try {
            const userCreate = await userService.update(req);
            return res.json(userCreate);
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }
    },
    delete: async(req, res) => {
        try {
            const {id} = req.params;
            const userDelete = await userService.delete(id);
            return res.json(userDelete);
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }
    },
    login : async(req, res) => {
        try {
            console.log("Sssssssssssssssssssssssssssss");
            const {avatar_url, password} = req.body;
            const user = await userService.getByAvatar(avatar_url);
            if (!user){
                return res.json("User doesn't exist");
            }
            const validPass = await bcrypt.compare(password, user.password);
            console.log("PPPPPPPPPP", password, user.password);
            if (validPass)
                return res.json("Logged in");
            else
                return res.json("Invalid");
        } catch (error) {
            return errorHandler(res, error.message, 500);
        }

    }

}

module.exports = userController;