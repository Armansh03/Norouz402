const {body} = require("express-validator")

const orderCreateValidator = [
    body("ticket_id").toString(),
    body("user_id").toString(),
    body("count").toInt(),
    body("total_price").toFloat()
];

function orderPermittedKey(data) {
    const result = {};
    const PermittedKeys = ["id", "ticket_id", "user_id", "count", "total_price"]
    for (const key of PermittedKeys) {
        if (data.hasOwnProperty(key)){
            result[key] = data[key];
        }
    }
    result["registration_date"] = new Date();
    return result;
}
module.exports = {orderPermittedKey, orderCreateValidator};