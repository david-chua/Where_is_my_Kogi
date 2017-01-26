var express = require('express');
router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js');

//Show page to show all the users in the same page;
router.get('/', function(req, res){
  User.find({})
  .exec(function(err, users){
    if (err) {console.log(err); }
    res.render('users/index.hbs', {
      users: users,
      currentUser: req.session.currentUser })
    });
  });

// Signup function
router.get('/signup', function(req,res){
  res.render('users/signup.hbs');
});

//Showing the user's page to show only his information
router.get('/:id', authHelpers.authorize, function(req, res){
  User.findById(req.params.id)
  .exec(function(err, user){
    if (err) {res.send("Oops! You are not authorized!")};
    console.log(user);
    res.render('users/show.hbs', { user: user });
  });
});


//Registering users
router.post('/', authHelpers.createSecure, function(req,res){

  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password_digest: res.hashedPassword
});

  user.save(function(err,user){
    if (err) console.log(err);
    console.log(user);
    console.log(req.session.currentUser);
    res.redirect('/sessions/login');
  });
});

module.exports = router;
