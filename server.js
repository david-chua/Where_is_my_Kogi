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

mongoose.connect('mongodb://localhost/auth');
