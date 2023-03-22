const {userService} = require("./user.service")
const {errorHandler} = require("../../utils");


const userController = {

    get: async (req, res) => {
            try {
                const {id} = req.params;
                const user = await userService.getByID(id);
                return res.json(user);
            } catch (error) {
                errorHandler(res, error, 500)
            }
    },
    list: async (req, res) => {
        try {
            const userList = await userService.list();
            return res.json(userList);
        } catch (error) {
            errorHandler(res, error, 500);
        }
    },
    create: async(req, res) => {
        try {
            const userCreate = await userService.create(req);
            return res.json(userCreate);
        } catch (error) {
            errorHandler(res, error, 500);
        }
    },
    update: async(req, res) => {
        try {
            const userCreate = await userService.update(req);
            return res.json(userCreate);
        } catch (error) {
            errorHandler(res, error, 500);
        }
    },
    delete: async(req, res) => {
        try {
            const {id} = req.params;
            const userDelete = await userService.delete(id);
            return res.json(userDelete);
        } catch (error) {
            errorHandler(res, error, 500);
        }
    }

}

module.exports = userController;