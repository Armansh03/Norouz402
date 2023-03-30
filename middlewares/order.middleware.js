const {body} = require("express-validator")

const orderCreateValidator = [
    body("ticket_id").isString(),
    body("user_id").isString(),
    body("count").isInt(),
    body("total_price").isFloat()
];

function orderPermittedKey(data, update = 0) {
    const result = {};
    let PermittedKeys = ["id", "ticket_id", "user_id", "count", "total_price", "status"]
    if (update)
        PermittedKeys = ["count", "total_price", "status"]
    for (const key of PermittedKeys) {
        if (data.hasOwnProperty(key)){
            result[key] = data[key];
        }
    }
    result["registration_date"] = new Date();
    return result;
}

module.exports = {orderPermittedKey, orderCreateValidator};