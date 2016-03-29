/**
 * @fileoverview This is a class that handles the creation, access,
 * and modification of user accounts.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

// Dependencies
var assert = require('assert');
var crypto = require('crypto');
var mongodb = require('mongodb');

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
 * @type {string}
 */
DatabaseManager.DATABASE_URL = process.env.DATABASE_URL ||
    'mongodb://localhost:27017/farmers-market';

/**
 * This is the name of the table storing the users.
 * @type {string}
 */
DatabaseManager.USERS = 'users';

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
DatabaseManager.isValidUsername = function(username) {
  return username.length < 24 && !(/[^a-zA-Z0-9]/).test(username);
};

/**
 * This method checks the validity of a password.
 * @param {string} password The password to check.
 * @return {boolean}
 */
DatabaseManager.isValidPassword = function(password) {
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
DatabaseManager.prototype.registerUser = function(username, password, email,
                                                 callback) {
  this.mongoClient.connect(this.databaseUrl, function(error, database) {
    assert.equal(null, error);
    database.collection(DatabaseManager.USERS).insert({
      username: username,
      password: DatabaseManager.hash(password)
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
* @param {function()} callback The callback function that will return any errors
* as the first parameter, and the document as the second.
*/
DatabaseManager.prototype.getUser = function(username, callback){
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
  DatabaseManager.getUser(username, function(error, document){
    if(err || !document){
      callback(false, 'User does not exist');
      return;
    }
    callback(document.password == DatabaseManager.hash(password));
  })
};
/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = DatabaseManager;
