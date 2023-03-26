const db = require("../../db")
const {userMiddleware} = require("../../middlewares")

exports.userService = {
    getByID: async(id) => {

        try {
            const user =  await db.user.findUnique({
                where : {id : id},
                select: {
                    fname : true, 
                    lname : true
                }
            })
            if (!user)
                return "User doesn't exist"
            else
                return user; 
        } catch (error) {
            throw new Error(error.message);
        }
        
    },
    getByAvatar : async(avatar) =>{
        try {
            console.log(avatar);
            const user = await db.user.findUnique({
                where : {avatar_url : avatar},
            })
            return user;        
        } catch (error) {
            throw new Error(error.message);
        }

    },
    list : async () => {
        try {
            return await db.user.findMany({
                select : {
                    fname : true,
                    lname : true
                }
        }); 
        } catch (error) {
            throw new Error(error.message);
        }
        
    },
    create : async(reqBody) => {
        try {
            await db.user.create({
                data: userMiddleware.createPermittedData(req.body)
            })
            return "User created";  

                      
        } catch (error) {
            throw new Error(error.message);
        }

    },
    update : async(req) => {
        try {
            const {id} = req.params;
            const {fname, lname, avatar_url, registration_date, phone, birthday, password, wallet} = req.body;
            const user = await db.user.findUnique({
                where:{
                    id: id
                }
            })
            if (!user)
                return "User doesn't exist"
            else{
                const updateUser = await db.user.update({
                    where:{
                        id: id
                    },
                    data: userMiddleware.updatePermittedKeys(req.body)
                })
                return "User updated";
            }            
        } catch (error) {
            throw new Error(error.message);
        }

    },
    delete: async(id) => {
        try {
            const user = await db.user.findUnique({
                where:{
                    id: id
                }
            })
            if (!user)
                return "User doesn't exist"
            else{
                const deleteUser = await db.user.delete({
                    where:{
                        id : id
                    }
                })
                return "User deleted";
            } 
        } catch (error) {
            throw new Error(error.message);
        }

    },
    authenticate: async(username, password) => {

    }
}