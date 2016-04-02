/**
 * @fileoverview Test dump script
 * @author bleepbloopsify@gmail.com (Leon Chou)
 */

// Dependencies
var DatabaseManager = require('./lib/DatabaseManager');

var dbm = DatabaseManager.create();

dbm.registerUser("User", "password", "123 sesame street", "email@email.com");

dbm.createListing('User', {
  'title':"title",
  'username':'User',
  'price':12.50,
  'description':'!!!!'
}, function(error, message){
  console.log(message);
});

dbm.getListingsByUsername('User', function(error, listings){
  listings.forEach(function(doc){
    console.log(doc.title);
  });
  return;
});


dbm.getListingsByDistance(11229, 5, function(err, listings){
  console.log(listings);
});
