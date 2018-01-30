var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var bodyParser = require('body-parser');
var restapi = express();
var file = "/home/ubuntu/project/sqlite/test";
var db = new sqlite3.Database(file);
var cors = require('cors');
restapi.use(bodyParser.urlencoded({ extended: false }));
restapi.use(bodyParser.json());
restapi.use(cors());


restapi.get('/fileID', function(req, res){
  var stmt = "select * from TEST";
var db = new sqlite3.Database(file);
db.all(stmt, function(err, row) {
        if (err){
                console.err(err);
                res.status(500);
        }
        else {
                res.json({row});
                res.status(200);
        }
        res.end();
});
});

restapi.post('/updateID', function(req, res){
  var  body =req.body;
  var fileID = body.fileID;
  var stmt = "update TEST set FNUM= "+fileID+"";
var db = new sqlite3.Database(file);
db.all(stmt, function(err, row) {
        if (err){
                console.err(err);
                res.status(500);
        }
        else {
                res.json({row});
                res.status(200);
        }
        res.end();
});
});

db.close();

restapi.listen(4000);

console.log("Submit GET or POST to http://localhost:4000/data")
