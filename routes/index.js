const express = require('express');
const http = require('http');
const router = express.Router();
const RESTCall = (res, path) =>
  http.request({ host: 'farm.akfn.net', path }, (res2) => {
    let str = '';
    res2.on('data', (chunk) => str += chunk);
    res2.on('end', () => res.json(JSON.parse(str.replace(/([a-zA-Z]+)/ig, '"$1"'))));
  }).end();

let data = {
  lightStart: 0, lightDuration: 18, pumpInterval: 8
};

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/status', (req, res) => RESTCall(res, '/status'));

router.get('/pump-on', (req, res) => RESTCall(res, '/pump-off'));

router.get('/pump-off', (req, res) => RESTCall(res, '/pump-on'));

router.get('/light-on', (req, res) => RESTCall(res, '/light-off'));

router.get('/light-off', (req, res) => RESTCall(res, '/light-on'));

module.exports = router;
