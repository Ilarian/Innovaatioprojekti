var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

/* GET test db connection. */
router.get('/test', function(req, res, next) {
  //Callback function so we send the response when sql function is done.
  //This is done since sql function is async
  function sendResponse(result) {
    res.send(result);
  }
  db.test(sendResponse);
  
});

router.post('/suggestion/:name&:desc', function(req, res) {
  function sendResponse(result){
    res.send(result);
  }

  db.postSuggestion(req.params.name, req.params.desc, sendResponse);

});

router.get('/suggestion', function(req, res) {
  function sendResponse(result){
    res.send(result);
  }

  db.getSuggestion(sendResponse);

});

router.post('/results/:phys&:think&:soc', function(req, res) {
  function sendResponse(result){
    res.send(result);
  }

  db.postResults(req.params.phys, req.params.think, req.params.soc, sendResponse);

});

router.get('/getTaskToModify/:id', function(req,res){
  function sendResponse(result) {
    res.send(result);
  }
  db.getTaskToModify(req.params.id, sendResponse);
});

router.delete('/delete/:id', function(req, res) {
  db.delete(req.params.id);
});

router.post('/add', function(req, res) {
  db.add(req.body);
  res.redirect('/admin.html');
});

router.post('/update', function(req, res){
  db.updateTask(req.body);
  res.redirect('/admin.html');
});

router.get('/task', function(req, res) {
  function sendResponse(result){
    res.send(result);
  }

  db.getTask(sendResponse);

});

router.get('/location', function(req, res) {
  function sendResponse(result){
    res.send(result);
  }

  db.getLocation(sendResponse);

});

router.get('/image/:id', function(req, res) {
  function sendResponse(result){
    res.send(result);
  }

  db.getImage(req.params.id, sendResponse);

});

router.get('/video/:id', function(req, res) {
  function sendResponse(result){
    res.send(result);
  }

  db.getVideo(req.params.id, sendResponse);

});

module.exports = router;
