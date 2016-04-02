/**
 * @fileoverview This is to access any api needed by this server.
 * @author bleepbloopsify@gmail.com (Leon Chou)
 */
var request = require('request');
var assert = require('assert');


/** Constructor for the api accessor
 */
function ApiAccessor(zipcodeapiurl){
  this.zipcodeApiUrl = zipcodeapiurl;
}
/** This is the key needed to access the zipcode api
 * @const
 * @type {string}
 */
ApiAccessor.ZIPCODE_API_KEY = process.env.API_KEY || 000;
/** This is the url needed to access the zipcode api
 * @const
 * @type {string}
 */
ApiAccessor.ZIPCODE_API_URL = "https://www.zipcodeapi.com/rest/" + ApiAccessor.ZIPCODE_API_KEY;

/** Factory method for ApiAccessor
 * @return {ApiAccessor}
 */
ApiAccessor.create = function(){
  var apiAccessor = new ApiAccessor(
    ApiAccessor.ZIPCODE_API_URL
  );
  return apiAccessor;
};

/** This is the method that accesses the api and returns zipcodes based on distance.
 * @param {int} zipcode - center of circle
 * @param {int} distance - radius
 * @param {function()}
 */
ApiAccessor.prototype.getZipcodesByDistance = function(zipcode, distance, callback){
  request(this.zipcodeApiUrl + '/radius.json/'+zipcode+'/'+distance+'/mile',function(error, response, body){
    assert.equal(null, error);
    var zipcodes = [];
    var parsed = JSON.parse(body)['zip_codes'];
    parsed.forEach(function(doc){
      console.log(doc);
      zipcodes.push(doc['zip_code']);
    }, function(){
      console.log(zipcodes);
      callback(zipcodes);
    });
  })
};

module.exports = ApiAccessor;
