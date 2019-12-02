var express = require('express');
var router = express.Router();
var db = require('../database/db.js');
const multer = require('multer');
const fs = require('fs');
const path = require("path");

const upload = multer({
  dest: "/temp"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


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

router.get('/getImages', (req, res) => {
  fs.readdir('./public/images/annala/', (err, files) =>{
    let fileArr = [];
    files.forEach(file => {
      fileArr.push(file);
    })
    console.log(fileArr);
    res.send(fileArr);
  })
});

router.post('/upload', upload.single("file"), function (req, res) {

  //TODO hae paikanNimi dynaamisesti
  let paikanNimi = "annala";
  let dir = "./public/images/" + paikanNimi + "/";

  var file = dir + req.file.originalname;
  if (!fs.existsSync(dir)) {
    !fs.mkdirSync(dir, {recursive: true});
  }

  let extension = path.extname(file).toLowerCase();
  if (extension === ".png" || extension === ".jpeg" || extension === ".jpg") {

    fs.readFile(req.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
        if (err) {
          console.error(err);
          response = {
            message: 'Sorry, file couldn\'t be uploaded.',
            filename: req.file.originalname
          };
        } else {
          response = {
            message: 'File uploaded successfully',
            filename: req.file.originalname
          };
        }
        res.end(JSON.stringify(response));
      });
    });
  } else { res.end("Wrong filetype!")}
})

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
