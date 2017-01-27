var express = require('express');
router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js')
var Restaurant = require('../models/restaurant.js');
var authHelpers = require('../helpers/auth.js');

//LOG-IN
router.get('/login', function(req, res){
  res.render('users/login.hbs');
});

router.post('/login', authHelpers.loginUser, function(req, res){
  res.redirect('/users/' + req.session.currentUser._id);
});

router.delete('/', function(req, res) {
  req.session.destroy(function(){
    res.redirect('../');
  });
});


module.exports = router;
