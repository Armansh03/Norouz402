const {body, check} = require("express-validator")
const db = require("../db")


exports.userCreateValidator = [
    body("registration_date").isISO8601(),
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