var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  reviews: [new Schema({
    username:String,
    comment:String,
    datemade:{type:Date, default:Date.now}
  }, {_id:false})],
  products:[new Schema({
    productname: String,
    datemade:{type:Date, default:Date.now}
    description:String,
    price:String
  }, {_id:false})]
});
