const express = require('express');
const router = express.Router();
let data = {
  lightStart: 0, lightDuration: 18, pumpInterval: 8
};

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  const { lightStart, lightDuration, pumpInterval } = res.body;
})

module.exports = router;
