// require("dotenv").config();

import pg from "pg";
const db = new pg.Pool({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    
});

db.connect((err) => {
    if(err) {
        console.log(err);
    }
});

module.exports = db;