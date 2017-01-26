var express = require('express');
router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js')
var Restaurant = require('../models/restaurant.js');
var authHelpers = require('../helpers/auth.js');

// Adding a new Restaurant
router.post('/:id/items', function(req,res){
  User.findById(req.params.id)
  .exec(function(err, user){
    user.restaurant.push(new restaurant({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      mfhours: req.body.mfhours,
      sathours: req.body.sathours,
      sunhours: req.body.sunhours,
      most_popular: req.body.most_popular,
      favorite_dish: req.body.favorite_dish
    }));
      user.save(function(err){
        if (err) console.log(err);
        res.send(user);
      });
  });
});


//Removing a Restaurant from the list
router.delete('/:userId/items/:id', function(req,res){
  User.findByIdAndUpdate(req.params.userId, {
    $pull:{
     restaurants: {_id: req.params.id}
    }
  })
  .exec(function(err,restaurant){
    if(err) console.log(err);
    res.redirect('/users')
  });
});










module.exports = router;
