/**
 * @fileoverview Unit test
 * @author bleepbloopsify@gmail.com (Leon Chou)
 */

// Dependencies
var DatabaseManager = require('../lib/DatabaseManager');

var dbm = DatabaseManager.create();

dbm.registerUser("User", "password", "email@email.com", function(status) {
  console.log(status);
});
