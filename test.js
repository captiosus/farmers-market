/**
 * @fileoverview Test dump script
 * @author bleepbloopsify@gmail.com (Leon Chou)
 */

// Dependencies
var DatabaseManager = require('./lib/DatabaseManager');

var dbm = DatabaseManager.create();

dbm.registerUser("Leon", "password", "123 sesame street", "email@email.com");

dbm.createListing('Leon', {
  'title':"title",
  'username':'Leon',
  'buyprice':12.50,
  bidprice:10,
  'description':'!!!!',
  zipcode: "11229",
  pictures:[
    'public/img/hangingpots.png'
  ]
}, function(error, message){
  console.log(message);
});

dbm.getListingsByUsername('User', function(error, listings){
  listings.forEach(function(doc){
    console.log(doc.title);
  });
  return;
});


dbm.getListings(function(listings){
  console.log(listings);
}, 11229);

dbm.getListings(function(listings){
  console.log(listings);
})
