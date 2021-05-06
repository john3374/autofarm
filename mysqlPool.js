const mysql = require("mysql");
const pool = mysql.createPool({
   connectionLimit: 6,
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_SCHEMA
});
const x = {pool: pool, escape: mysql.escape};
module.exports = x;