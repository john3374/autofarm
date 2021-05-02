const express = require('express');
const http = require('http');
const router = express.Router();
let data = {
  lightStart: 0, lightDuration: 18, pumpInterval: 8
};

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/status', (req, res) => {
  http.request({ host: 'farm.akfn.net', path: '/status' }, (res2) => {
    let str = '';
    res2.on('data', (chunk) => str += chunk);
    res2.on('end', () => res.json(JSON.parse(str.replace(/([a-zA-Z]+)/ig, '"$1"'))));
  }).end();
});

router.get('/pump-on', (req, res) => {
  http.request({ host: 'farm.akfn.net', path: '/pump-off' }, (res2) => {
    let str = '';
    res2.on('data', (chunk) => str += chunk);
    res2.on('end', () => res.json(JSON.parse(str.replace(/([a-zA-Z]+)/ig, '"$1"'))));
  }).end();
});

router.get('/pump-off', (req, res) => {
  http.request({ host: 'farm.akfn.net', path: '/pump-on' }, (res2) => {
    let str = '';
    res2.on('data', (chunk) => str += chunk);
    res2.on('end', () => res.json(JSON.parse(str.replace(/([a-zA-Z]+)/ig, '"$1"'))));
  }).end();
});

router.get('/light-on', (req, res) => {
  http.request({ host: 'farm.akfn.net', path: '/light-off' }, (res2) => {
    let str = '';
    res2.on('data', (chunk) => str += chunk);
    res2.on('end', () => res.json(JSON.parse(str.replace(/([a-zA-Z]+)/ig, '"$1"'))));
  }).end();
});

router.get('/light-off', (req, res) => {
  http.request({ host: 'farm.akfn.net', path: '/light-on' }, (res2) => {
    let str = '';
    res2.on('data', (chunk) => str += chunk);
    res2.on('end', () => res.json(JSON.parse(str.replace(/([a-zA-Z]+)/ig, '"$1"'))));
  }).end();
});

router.post('/', (req, res) => {
  const { lightStart, lightDuration, pumpInterval } = res.body;
})

module.exports = router;
