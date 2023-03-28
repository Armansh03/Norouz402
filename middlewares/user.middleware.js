function updatePermittedKeys(data){
    const result = {};
    const PermittedKeys = ["fname", "lname", "avatar_url", "phone", "birthday", "password"]
    for (const key of PermittedKeys) {
        if (data.hasOwnProperty(key)){
            if (key == "birthday")
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
    const PermittedKeys = ["id", "fname", "lname", "avatar_url", "phone", "birthday", "password"]
    for (const key of PermittedKeys) {
        if (data.hasOwnProperty(key)){
            if (key == "birthday")
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
    result["registration_date"] = new Date();
    return result;
}
module.exports = {createPermittedData, updatePermittedKeys};