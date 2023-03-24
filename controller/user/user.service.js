const db = require("../../db")


function updatePermittedKeys(data){
    const result = {};
    const PermittedKeys = ["fname", "lname", "avatar_url", "registration_date", "phone", "birthday", "password"]
    for (const key of PermittedKeys) {
        if (data.hasOwnProperty(key)){
            if (key == "birthday" || key == "registration_date")
                result[key] = new Date(data[key]);
            else
                result[key] = data[key];
        }
    }
    return result;
}

function createPermittedData(data) {
    const result = {};
    let flag = 0;
    let notGiven = [];
    const PermittedKeys = ["id", "fname", "lname", "avatar_url", "registration_date", "phone", "birthday", "password"]
    for (const key of PermittedKeys) {
        if (data.hasOwnProperty(key)){
            if (key == "birthday" || key == "registration_date")
                result[key] = new Date(data[key]);
            else
                result[key] = data[key];
        }
        else{
            flag = 1
            notGiven.push(key);
        }
    }
    if (flag){
        throw new Error(`All data should be sent. ${notGiven} not given`);
    }
    return result;
}

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
    create : async(req) => {
        try {
            await db.user.create({
                data: createPermittedData(req.body)
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
                    data: updatePermittedKeys(req.body),
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

    }
}