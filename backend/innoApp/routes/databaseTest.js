var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

/* GET test db connection. */
router.get('/', function(req, res, next) {
  db.test();
  res.send('test');
});

module.exports = router;
