var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

//Restaurant Schema
var RestaurantSchema = new Schema({
  name: String,
  address: String,
  city: String,
  State: String,
  Zip: Number,
  Hours: String,
  Most_Popular: String,
  Favorite_Dish: String
});

var UserSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password_digest: String,
  restaurants: [RestaurantSchema],
  created_at: Date,
  updated_at: Date
});

RestaurantSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) {this.created_at = now}
  next();
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next();
});

var UserModel = mongoose.model('User', UserSchema);
var RestaurantModel = mongoose.model('Restaurant', RestaurantSchema);

module.exports = {
  User: UserModel,
  Restaurant: RestaurantModel
};
