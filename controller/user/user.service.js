const db = require("../../db")

exports.userService = {
    getByID: async(id) => {
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
    },
    list : async () => {
        return await db.user.findMany({
            select : {
                fname : true,
                lname : true
            }
        });
    },
    create : async(req) => {
        const {id, fname, lname, avatar_url, registration_date, phone, birthday, password, wallet} = req.body;
        console.log(id, fname, lname, avatar_url, registration_date, phone, birthday, password, wallet, "sssssssssssssssssssssssssssss");

        const user = await db.user.create({
            data:{
                id, fname, lname, avatar_url, 
                registration_date : new Date(registration_date), 
                phone, 
                birthday : new Date(birthday),
                password, wallet
            }
        })
        return "User created";
    },
    update : async(req) => {
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
            console.log(id, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            const updateUser = await db.user.update({
                where:{
                    id: id
                },
                data:{
                    id, fname, lname, avatar_url, 
                    registration_date : new Date(registration_date), 
                    phone, 
                    birthday : new Date(birthday),
                    password, wallet
                }
            })
            console.log(user, "salamaaaaaaaaaaaaaaaaa");
            return "User updated";
        }
    },
    delete: async(id) => {
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
    }
}