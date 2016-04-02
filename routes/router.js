/**
 * @fileoverview Router for the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

// Dependencies
var express = require('express');
var DatabaseManager = require('../lib/DatabaseManager');

var dbm = DatabaseManager.create();
var router = express.Router();

router.get('/', function(request, response) {
  response.render('index');
});

router.get('/test', function(request, response){
  if (request.app.locals.dev_mode) {
    response.render('test');
  } else {
    response.redirect('/');
  }
});

router.get('/listings', function(request, response) {
  response.render('listings');
});
router.get('/listings/:id', function(request, response){
  var listingid = request.params.id;
  response.render('product');
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
  if (!dbm.isValidUsername(username)) {
    response.json({
      success: false,
      message: 'Invalid username!'
    });
  }
  if (!dbm.isValidPassword(password)) {
    response.json({
      success: false,
      message: 'Your password is too short.'
    });
  }

  dbm.registerUser(username, password, email, function(status) {
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
  dbm.isUserAuthenticated(username, password, function(status) {
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

router.get('/listings/:id', function(request, response){
  dbm.getListing(request.params.id, function(error, listing){
    assert.equal(null, error);
    if (!listing) {
      response.render('listing');
    } else {
      response.render('listing', {'listing':listing});
    }
  });
});

router.get('/listings', function(request, response){

})


module.exports = router;
