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

//
// router.get('/', function(request, response){
//   DatabaseManager.registerUser(
//     "Leon",
//     "Leon",
//     "leon@leon.com",
//      function(status){
//     response.write("Register " + status+ "\n");
//   });
//   DatabaseManager.getUser("Leon", function(err, document){
//     if(err){
//       console.log(err);
//       return;
//     }
//     console.log(document);
//     response.write(JSON.stringify(document)+ "\n");
//   });
//   DatabaseManager.updateUser('Leon', {'email':"bleepbloopsify@gmail.com"});
//   DatabaseManager.isUserAuthenticated("Leon", "Leon", function(status, message){
//     if(message){
//       response.write(status + message + "\n");
//     }else{
//       response.write("Login "+status + "\n");
//     }
//   });
//   DatabaseManager.getUser("Leon", function(err, document){
//     if(err){
//       console.log(err);
//       return;
//     }
//     console.log(document);
//     response.write(JSON.stringify(document)+ "\n");
//   });
//   DatabaseManager.updateUser("Leon", {"reviews":[{"username":"Leon", "date":"3/29/16","comment":"hahgay"}]}, function(user, message){
//     if (message){
//       response.write(message);
//       return;
//     }
//     response.write(JSON.stringify(user));
//   });
//   DatabaseManager.getUser("Leon", function(err, document){
//     if(err){
//       console.log(err);
//       return;
//     }
//     console.log(document);
//     response.end(JSON.stringify(document)+ "\n");
//   });
// });
//
// module.exports = router;
