var bcrypt = require('bcrypt');
var User = require('../models/user.js');


//create an encrypted password
function createSecure(req, res, next) {
  var password = req.body.password;

  res.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  next();
}

//function to log in user or send them to unauthorized access
function loginUser(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email: email })
  .then(function(foundUser){
    if (foundUser == null) {
      res.json({status: 401, data: "unauthorized"});

    } else if (bcrypt.compareSync(password, foundUser.password_digest)) {
      req.session.currentUser = foundUser;
    }
    next();
  })
  .catch(function(err){
    res.json({status: 500, data: err});
  });
}

//authorize function
function authorize(req, res,next){
  var currentUser = req.session.currentUser
  if (!currentUser || currentUser._id !== req.params.id){
    res.send({status: 404})
  } else{
    next()
  };
}

//export functions

module.exports = {
  createSecure: createSecure,
  loginUser: loginUser,
  authorize: authorize
};
