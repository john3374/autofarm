const express = require('express');
const cors = require('cors');
const router = express.Router();
const corsOption = {
  origin: "http://http://174.91.78.56:25565/",
  optionsSuccessStatus: 200
}
let data = {
  lightStart: 0, lightDuration: 18, pumpInterval: 8
};

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/status', cors(corsOption), (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  const { lightStart, lightDuration, pumpInterval } = res.body;
})

module.exports = router;
