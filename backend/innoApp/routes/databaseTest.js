var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

/* GET test db connection. */
router.get('/', function(req, res, next) {
  //Callback function so we send the response when sql function is done.
  //This is done since sql function is async
  function sendResponse(result) {
    res.send(result);
  }
  db.test(sendResponse);
  
});

module.exports = router;
