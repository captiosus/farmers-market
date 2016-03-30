/**
 * @fileoverview Router for the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

// Dependencies
var express = require('express');

var DatabaseManager = require('../lib/DatabaseManager');

var DatabaseManager = DatabaseManager.create();
var router = express.Router();

router.get('/', function(request, response) {
  response.render('index');
});

router.get('/test', function(request, response){
  DatabaseManager.registerUser(
    "Leon",
    "Leon",
    "leon@leon.com",
     function(status){
    response.write("Register " + status+ "\n");
  });
  DatabaseManager.getUser("Leon", function(err, document){
    if(err){
      console.log(err);
      return;
    }
    console.log(document);
    response.write(JSON.stringify(document)+ "\n");
  });
  DatabaseManager.updateUser('Leon', {'email':"bleepbloopsify@gmail.com"});
  DatabaseManager.isUserAuthenticated("Leon", "Leon", function(status, message){
    if(message){
      response.write(status + message + "\n");
    }else{
      response.write("Login "+status + "\n");
    }
  });
  DatabaseManager.getUser("Leon", function(err, document){
    if(err){
      console.log(err);
      return;
    }
    console.log(document);
    response.write(JSON.stringify(document)+ "\n");
  });
  DatabaseManager.updateUser("Leon", {"reviews":[{"username":"Leon", "date":"3/29/16","comment":"hahgay"}]}, function(user, message){
    if (message){
      response.write(message);
      return;
    }
    response.write(JSON.stringify(user));
  });
  DatabaseManager.getUser("Leon", function(err, document){
    if(err){
      console.log(err);
      return;
    }
    console.log(document);
    response.end(JSON.stringify(document)+ "\n");
  });
});
router.get('/listings', function(request, response) {
  response.render('listings');
});

router.get('/register', function(request, response) {
  response.redirect('/');
});


router.post('/register', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  var email = request.body.email;

  if (request.session.username) {
    response.json({
      success: false,
      message: 'You must log out in order to register a user!'
    });
  }
  if (!DatabaseManager.isValidUsername(username)) {
    response.json({
      success: false,
      message: 'Invalid username!'
    });
  }
  if (!DatabaseManager.isValidPassword(password)) {
    response.json({
      success: false,
      message: 'Your password is too short.'
    });
  }

  DatabaseManager.registerUser(username, password, email, function(status) {
    if (status) {
      request.session.username = username;
      response.json({
        success: true,
        message: 'Successfully registered!'
      });
    } else {
      response.json({
        success: false,
        message: 'Your username is taken.'
      });
    }
  });
});

router.get('/login', function(request, response) {
  response.redirect('/');
});

router.post('/login', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;

  if (request.session.username) {
    response.json({
      success: false,
      message: 'You are already logged in.'
    });
  }
  DatabaseManager.isUserAuthenticated(username, password, function(status) {
    if (status) {
      request.session.username = username;
      response.json({
        success: true,
        message: 'Successfully logged in!'
      });
    } else {
      response.json({
        success: false,
        message: 'Invalid credentials.'
      });
    }
  });
});

router.get('/logout', function(request, response) {
  request.session.username = null;
  response.redirect('/');
});

router.post('/logout', function(request, response) {
  request.session.username = null;
  response.redirect('/');
});

module.exports = router;
