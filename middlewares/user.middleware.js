
const {body, check} = require("express-validator")
const db = require("../db")


const userCreateValidator = [
    body("birthday").isISO8601(),
    body("fname").isString(),
    body("lname").isString(),
    body("avatar_url").isString(),
    body("phone").isString(),
    body("password").isString(),
    check("avatar_url").custom(async(val) => {
        const user = await db.user.findFirst({
            where : {
                avatar_url : val
            }
        })
        if (user){
            return Promise.reject("Repeated avatar_url!")
        }
        return val;
    })
]

function userPermittedKey(data) {
    const result = {};
    let flag = 0;
    const PermittedKeys = ["id", "fname", "lname", "avatar_url", "phone", "birthday", "password"]
    for (const key of PermittedKeys) {
        if (data.hasOwnProperty(key)){
            if (key == "birthday")
                result[key] = new Date(data[key]);
            else
                result[key] = data[key];
        }
    }
    result["registration_date"] = new Date();
    return result;
}
module.exports = {userPermittedKey, userCreateValidator};