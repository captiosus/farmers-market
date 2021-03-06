/**
 * @fileoverview This is a class that handles the creation, access,
 * and modification of user accounts.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

// Dependencies
var assert = require('assert');
var crypto = require('crypto');
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;

var apiaccessor = require('./ApiAccessor').create();


/**
 * Constructor for an DatabaseManager.
 * @param {Object} mongoClient An instance of a MongoClient.
 * @param {string} databaseUrl The URL of the database to access.
 * @constructor
 */
function DatabaseManager(mongoClient, databaseUrl) {
  this.mongoClient = mongoClient;
  this.databaseUrl = databaseUrl;
}

/**
 * This is the URL of database to access.
 * @const
 * @type {string}
 */
DatabaseManager.DATABASE_URL = process.env.DATABASE_URL ||
    'mongodb://localhost:27017/nutritrade';

/**
 * This is the name of the table storing the users.
 * @const
 * @type {string}
 */
DatabaseManager.USERS = 'users';
/**
 * This is the name of the table storing the listings.
 * @const
 * @type {type}
 */
DatabaseManager.LISTINGS = 'listings';

/**
 * This is a factory method for the DatabaseManager class.
 * @return {DatabaseManager}
 */
DatabaseManager.create = function() {
  var databaseManager = new DatabaseManager(
      mongodb.MongoClient, DatabaseManager.DATABASE_URL);
  databaseManager.init();
  return databaseManager;
};

/**
 * This returns the SHA256 hash of the given string.
 * @param {string} string The string to hash.
 * @return {string}
 */
DatabaseManager.hash = function(string) {
  return crypto.createHash('sha256').update(string).digest('base64');
};

/**
 * This method checks the validity of a given username.
 * @param {string} username The username to check
 * @return {boolean}
 */
DatabaseManager.prototype.isValidUsername = function(username) {
  return username.length < 24 && !(/[^a-zA-Z0-9]/).test(username);
};

/**
 * This method checks the validity of a password.
 * @param {string} password The password to check.
 * @return {boolean}
 */
DatabaseManager.prototype.isValidPassword = function(password) {
  return password.length >= 4;
};

/**
 * This method initializes an DatabaseManager and tries to establish
 * a connection to the MongoDB database.
 */
DatabaseManager.prototype.init = function() {
  this.mongoClient.connect(this.databaseUrl, function(error, database) {
    assert.equal(null, error);
    console.log('CONNECTED CORRECTLY TO MONGODB SERVER');
    database.collection(DatabaseManager.USERS).createIndex({
      username: 1
    }, {
      unique: true
    });
    database.close();
  });
};

/**
 * This method registers a user and stores them into the MongoDB database.
 * @param {string} username The username of the user.
 * @param {string} password The password of the user, which will be hashed
 *   before being stored.
 * @param {string} email The email of the user.
 * @param {function()} callback The callback function which will be called
 *   with the error status for registering the user, if any.
 */
DatabaseManager.prototype.registerUser = function(
    username, password, email, callback) {
  this.mongoClient.connect(this.databaseUrl, function(error, database) {
    assert.equal(null, error);
    database.collection(DatabaseManager.USERS).insert({
      username: username,
      password: DatabaseManager.hash(password),
      email: email
    }, function(error, result) {
      if (error) {
        callback(false);
        return;
      }
      callback(true);
    });
  });
};

/**
* This method returns the user associated with this username from the database.
* @param {string} username The username to be queried for.
* @param {function()} callback The callback function that will return any
*   errors as the first parameter, and the document as the second.
*/
DatabaseManager.prototype.getUser = function(username, callback) {
  this.mongoClient.connect(this.databaseUrl, function(error, database) {
    assert.equal(null, error);
    database.collection(DatabaseManager.USERS).findOne({
      username: username
    }, function(error, document) {
      if (error || !document) {
        callback(false);
        return;
      }
      callback(null, document);
    });
  });
};

/**
 * This method checks a given user against the database and verifies if
 * the given password matches their password.
 * @param {string} username The username of the user to check.
 * @param {string} password The password of the user to check.
 * @param {function()} callback The callback function which will be called
 *   with the authentication status of the user or an error if there was one.
 */
DatabaseManager.prototype.isUserAuthenticated = function(username, password,
                                                         callback) {
  this.mongoClient.connect(this.databaseUrl, function(error, database) {
    assert.equal(null, error);
    database.collection(DatabaseManager.USERS).findOne({
      username: username
    }, function(error, document) {
      if (error || !document) {
        callback(false, 'User does not exist.');
        return;
      }
      callback(document.password == DatabaseManager.hash(password));
    });
  });
};

/**
 * This method updates the user document with the provided fields. If a field is
 * a dictionary, the field is instead inserted into the dictionary.
 * @param {string} username The username of the user to be updated.
 * @param {Object} fields The fields of the user to modify.
 * @param {function()} callback The callback function if there was an error.
 */
DatabaseManager.prototype.updateUser = function(username, fields, callback) {
  this.mongoClient.connect(this.databaseUrl, function(error, database) {
    assert.equal(null, error);
    database.collection(DatabaseManager.USERS).updateOne({
      'username': username
    }, {
      '$set': fields
    }, function(error, results) {
      if (error || !results) {
        if (callback) {
          callback({
            success: false,
            message: 'User does not exist!'
          });
        }
        return;
      }
      if (callback) callback({success: true});
    });
  });
};
/** This is a function that creates a new listing
 * @param {string} username - user that created the listing!
 * @param {Object} listing - the document to be inserted
 * @param {function()} callback - returns true or false based on success
 */
DatabaseManager.prototype.createListing = function(username, listing, callback){
  this.mongoClient.connect(this.databaseUrl, function(error, database){
    assert.equal(null, error);
    database.collection(DatabaseManager.LISTINGS).insert(listing, function(error, results){
      assert.equal(null, error);
      database.collection(DatabaseManager.LISTINGS).findOne(listing, function(error, document){
        assert.equal(null, error);
        database.collection(DatabaseManager.USERS).updateOne({
          username:username
        }, {
          '$push':{'listings':document['_id']}
        }, function(error, results){
          assert.equal(null, error);
          if(callback) callback(null, "Listing Created!");
        });
      });
    });
  });
};

/** This is a function that returns the listing associated with the id passed
 * @param {string} listingId - id of listing
 * @param {function()} callback - returns err if listing does not exist, else
 *returns null and the listing object
 */
DatabaseManager.prototype.getListing = function(listingId, callback){
  this.mongoClient.connect(this.databaseUrl, function(error, database){
    assert.equal(null, error);
    database.collection(DatabaseManager.LISTINGS).findOne({
      _id: new ObjectId(listingId)
    }, function(error, document){
      if(error){
        callback(error);
        return;
      }else{
        callback(null, document);
        return;
      }
    });
  })
}
/** This methods updates each listing witht he fields provided. Will remove any existing fields!
 * @param {int} listingId - id of listing to be updated
 * @param {Object} fields - fields to replace existing object with
 * @param {function()} callback - function that returns err as first param, and message as second param
 */
DatabaseManager.prototype.updateListing = function(listingId, fields, callback){
  this.mongoClient.connect(this.databaseUrl, function(error, database){
    assert.equal(null, error);
    database.collection(DatabaseManager.LISTINGS).updateOne({
      _id: listingId
    }, {
      '$set':fields
    }, function(error, results){
      if(error){
        if(callback) callback(error, 'Listing does not exist!');
        return;
      }
      if(callback) callback(null, 'Listing updated!');
      return;
    })
  })
};

/** This method returns all listings associated with a user.
 * @param {string} username - username associated with listings
 * @param {function()} callback - returns array of listing objects.
 */
DatabaseManager.prototype.getListingsByUsername = function(username, callback){
  this.mongoClient.connect(this.databaseUrl, function(error, database){
    assert.equal(null, error);
    var listings = []
    database.collection(DatabaseManager.LISTINGS).find({
      username:username
    }).forEach(function( document, var2, var3 ){
      listings.push(document);
    }, function(){
      callback(null, listings);
    });
  });
};

/** This is a method that returns all listings within the radius defined by distance.
 * If there is no zipcode defined, returns all listings
 * @param {int} zipcode - center!
 */
DatabaseManager.prototype.getListings = function( callback, zipcode){
  this.mongoClient.connect(this.databaseUrl, function(error, database){
    assert.equal(null, error);
    var listings = []
    if(!zipcode){
      database.collection(DatabaseManager.LISTINGS).find()
        .forEach(function(doc){
          listings.push(doc);
        }, function(){
          callback(listings);
        });
    }else{
      apiaccessor.getZipcodesByDistance(zipcode, function(zipcodes){
        if(!zipcodes){callback(null); return;}
        database.collection(DatabaseManager.LISTINGS).find({
          'zipcode':{'$in':Object.keys(zipcodes)}
        }).forEach(function(doc){
          doc.distance = zipcodes[doc.zipcode]['distance'];
          listings.push(doc);
        }, function(){
          callback(listings);
        });
      });
    }
  })
}

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = DatabaseManager;
