const {body} = require("express-validator")

const ticketCreateValidator = [
    body("from_location").isString(),
    body("to_location").isString(),    
    body("arrival_date").isISO8601(),
    body("departure_date").isISO8601(),
    body("unit_price").isFloat(),
    body("count").isInt()
]

function ticketPermittedKey(data) {
    const permitted = ["id", "from_location", "to_location", "arrival_date", "departure_date", "unit_price", "count"];
    let result = {};
    for (const key of permitted) {
        if (data.hasOwnProperty(key)){
            if (key == "arrival_date" || key == "departure_date")
                result[key] = new Date(data[key]);
            else
                result[key] = data[key];
        }
    }
    console.log(result);
    return result;
}

module.exports = {ticketPermittedKey, ticketCreateValidator};