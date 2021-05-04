const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// bcrypt.compareSync(json.password, password)

router.get('/', (req, res) => res.end(uuidv4()));

router.get('/signin', (req, res) => {
  const { auth_token, auth_expiry } = req.session;
  if (auth_token && auth_expiry < new Date().getTime())
    // retrieve iduser 
    db.pool.query('select iduser from authtokens where idauthtokens=?'[auth_token], (err, res) => {
      if (err)
        console.log(err);
      else
        try {
          db.pool.query('insert into authtokens (idauthtokens, iduser) values (uuid_to_bin(?), ?, ?)',
            [
              req.session.auth_token = uuidv4(),
              res[0].iduser,
              req.session.auth_expiry = new Date().getTime() + 86400
            ], (err) => err ? console.log(err) : '');
        } catch (e) {
          console.log(e);
        }
    });
  res.redirect('/');
});

module.exports = router;