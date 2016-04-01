/**
 * @fileoverview Test dump script
 * @author bleepbloopsify@gmail.com (Leon Chou)
 */

// Dependencies
var DatabaseManager = require('../lib/DatabaseManager');

var dbm = DatabaseManager.create();

dbm.registerUser("User", "password", "123 sesame street", "email@email.com",
    function(status) {
  console.log(status);
});
