const session = require('express-session');
const sqlStore = require('express-mysql-session')(session);
const sessionStore = new sqlStore({
   host: "localhost",
   user: "farmer",
   password: "W3m7SuYaGIt3",
   database: "autofarm"
});
module.exports = session({
   name: "SSSESSIONID",
   secret: "shdtksmswmfrjdnj!",
   store: sessionStore,
   resave: false,
   saveUninitialized: false
});