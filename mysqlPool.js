const mysql = require("mysql");
const pool = mysql.createPool({
   connectionLimit: 6,
   host: "localhost",
   user: "farmer",
   password: "W3m7SuYaGIt3",
   database: "autofarm"
});
const x = {pool: pool, escape: mysql.escape};
module.exports = x;