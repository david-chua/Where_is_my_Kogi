var express = require('express');
router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js')
var Restaurant = require('../models/restaurant.js');
var authHelpers = require('../helpers/auth.js');

// Adding a new Restaurant
router.post('/', function(req, res){
var restaurant = new Restaurant({
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
    });

  User.findById(req.session.currentUser._id)
  .exec(function(err, user){
    if (err) {console.log(err);}
    user.products.push(product);
    user.save();
    res.send(user);
  });
});

//Get route to render an edit page
  router.get('/:id/edit', function(req,res){
    res.render('restaurants/edit.hbs');
  })

  //Update that saves the changes of the edit
router.put('/:id', function(req,res){
  restaurant.findByIDAndUpdate(req.params.id, {
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
  }, {new: true})
  .exec(function(err, restaurant){
    if(err) {console.log(err);}
    console.log(restaurant);
    res.send(restaurant);
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
    res.send (restaurant + "Deleted");
  });
});










module.exports = router;
