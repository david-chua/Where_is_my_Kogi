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
    })
  })
})






module.exports = router;
