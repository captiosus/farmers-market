/**
 * @fileoverview Router for the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

// Dependencies
var express = require('express');
var DatabaseManager = require('../lib/DatabaseManager');
var assert = require('assert');

var dbm = DatabaseManager.create();
var router = express.Router();

router.get('/', function(request, response) {
  response.render('index');
});

router.get('/test', function(request, response){
  if (request.app.locals.dev_mode) {
    response.render("payment");
  } else {
    response.redirect('/');
  }
});

router.get('/message', function(request, response){
  if(!request.session.username){
    response.redirect('/');
  }
  response.render('message', {request:request});
});
router.post('/message', function(request, response){
  // if()
})


router.get('/listings/:id', function(request, response){
  dbm.getListing(request.params.id, function(error, listing){
    assert.equal(null, error);
    if (!listing) {
      response.render('nolisting', {request:request});
    } else {
      response.render('product', {'listing':listing, request:request});
    }
  });
});
router.post('/listings/:id', function(request, response){
  dbm.getListing(request.params.id, function(error, listing){
    assert.equal(null, error);
    if (!listing) {
      response.send(false);
    } else {
      response.json(listing);
    }
  });
});

router.get('/listings', function(request, response){
  console.log(request.session.username);
  response.render('listings', {request:request});
});

router.post('/listings', function(request, response){
  var zipcode = request.body.zipcode;
  dbm.getListings(function(listings){
    if (!listings){
      response.json({
        success:false,
        message:"No listings found."
      });
    }else{
      response.json({
        success:true,
        listings:listings
      });
    }
  }, zipcode);
});

router.get('/newlisting', function(request, response){
  response.render('newlisting', {request:request});
});
router.post('/newlisting', function(request, response){
  var body = request.body;
  var files = request.files;
  body.pictures = [];
  for (var filekey in files){
    body.pictures.push(files[filekey]['filename'])
  }
  console.log(body);
  dbm.createListing(request.session.username, body)
  response.send(false);
});

router.get('/register', function(request, response) {
  response.render('register');
});

router.get('/profile', function(request,response) {
  dbm.getListingsByUsername(request.session.username, function(err, listings){
    if(err){ response.redirect('/'); }
    response.render('profile', {request:request, listings:listings});
  })
});

router.post('/register', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  var email = request.body.email;
  console.log(request.body);
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
  console.log(request.body);
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

module.exports = router;
