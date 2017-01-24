pry = require('pryjs');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var logger = require('morgan');
var hbs = require('hbs');
var mongoose = require('mongoose');

var usersController = require('./controllers/users.js');
var sessionsController = require('./controllers/sessions.js');
var restaurantController = require('./controllers/restaurant.js');

var app = express();

mongoose.connect('mongodb://localhost/where_is_my_kogi');

app.set(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(logger('dev'));
app.use(methodOverride('_method'));

app.use(session({
  secret: "MeatisLife",
  resave: false,
  saveUninitialized: false
}));

app.use('/users', usersController);
app.use('/sessions', sessionsController);
app.use('/users/:id/restaurants', restaurantController);

app.listen(3000, function(){
  console.log("App is connected, find your nearest KBBQ!");
});
