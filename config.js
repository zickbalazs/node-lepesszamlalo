require('dotenv').config();

let port = process.env.PORT;
let pool = {
    host:process.env.DBH,
    user:process.env.DBU,
    password:process.env.DBP,
    database:process.env.DBN,
    connectionLimit:process.env.LIMIT
}
let config = {
    company: process.env.COMPANY,
    author: process.env.AUTHOR,
    title: process.env.TITLE
}

module.exports = {port, pool, config}