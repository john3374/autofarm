const session = require('express-session');
const sqlStore = require('express-mysql-session')(session);
const sessionStore = new sqlStore({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_SCHEMA
});
module.exports = session({
   name: "SSSESSIONID",
   secret: process.env.SESSION_SECRET,
   store: sessionStore,
   resave: false,
   saveUninitialized: false
});