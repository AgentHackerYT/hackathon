const fs = require('fs');

function config(){

    if(!fs.existsSync(".penv")) throw new Error("You have to create a \".penv\" file")

    const data = fs.readFileSync(".penv", "ascii")

    let parsed = data.split("=")

    return parsed

}

module.exports.config = config