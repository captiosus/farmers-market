/**
 * @fileoverview This is the server app script.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

// Constants
var DEV_MODE = false;
var IP = process.env.IP || 'localhost';
var PORT_NUMBER = process.env.PORT || 5000;
var API_KEY = process.env.API_KEY || 000;


// Sets the DEV_MODE constant during development if we run 'node server --dev'
process.argv.forEach(function(value, index, array) {
  if (value == '--dev' || value == '--development') {
    DEV_MODE = true;
  }
});

// Dependencies.
var assert = require('assert');
var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var session = require('express-session');
var mongodb = require('mongodb');
var busboy = require('connect-busboy');
var fs = require('fs');

var router = require('./routes/router');

// Initialization.
var app = express();
var server = http.Server(app);

app.set('port', PORT_NUMBER);
app.set('view engine', 'jade');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(busboy());
app.use(morgan(':date[web] :method :url :req[header] :remote-addr :status'));
app.use('/public',
        express.static(__dirname + '/public'));
app.use('/shared',
        express.static(__dirname + '/shared'));

// Use request.query for GET request params.
// Use request.body for POST request params.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
  if(req.busboy){
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
      if(!req.files) req.files = [];
      var filepath = __dirname + "/uploads/" + filename;
      req.files.push({
        fieldname:fieldname,
        file:file,
        filename:filename,
        encoding:encoding,
        mimetype:mimetype,
        filepath: filepath
      });
      var fstream = fs.createWriteStream(filepath);
      file.pipe(fstream);
      fstream.on("close", function(){
        console.log("finished file", file);
      })
    });
    req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
      req.body[key] = value;
    });
    req.busboy.on('finish', function(){
      console.log("uploaded");
      next();
    });
    req.pipe(req.busboy);
  }else{
    next();
  }
});

app.use('/', router);

app.locals.dev_mode = DEV_MODE;

// Starts the server.
server.listen(PORT_NUMBER, function() {
  console.log('STARTING SERVER ON PORT ' + PORT_NUMBER);
  if (DEV_MODE) {
    console.log('DEVELOPMENT MODE ENABLED');
  }
});
