var express = require('express');
router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js')
var Restaurant = require('../models/restaurant.js');
var authHelpers = require('../helpers/auth.js');

// Adding a new Restaurant
router.post('/', function(req, res){
 User.findById(req.session.currentUser._id)
 .exec(function(err, user){
   if(err) {console.log(err)}
   user.restaurants.push({
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
    })
    user.save();

    res.redirect("/users/" + req.session.currentUser._id);
  });
});


// Get route to render an edit page
  router.get('/:id/edit', function(req,res){
    console.log("This is REQ.Params:", req.params)
    User.findById(req.session.currentUser._id)
    .exec(function(err, user){
      console.log("Found the user!", user)

    var restaurant = user.restaurants.id(req.params.id);
    console.log("Found My Restaurant!:", restaurant)
    res.render('restaurants/edit.hbs', {
      user: user,
      restaurant: restaurant
      });
  });
});
  //
  // Update that saves the changes of the edit
  router.put('/:id', function(req, res) {
  //making sure pressing submit in my edit.hbs form goes to this route
    console.log("Hitting This Put Route!")
    console.log("current User:", req.session.currentUser._id)
    User.findById(req.session.currentUser._id)
    .exec(function(err, user){
      var restaurant = user.restaurants.id(req.params.id);
      restaurant.name= req.body.name;
      restaurant.name= req.body.name;
      restaurant.phone= req.body.phone;
      restaurant.address= req.body.address;
        restaurant.city=req.body.city;
        restaurant.state= req.body.state;
        restaurant.zip= req.body.zip;
        restaurant.mfhours= req.body.mfhours;
      restaurant.sathours= req.body.sathours;
        restaurant.sunhours= req.body.sunhours;
        restaurant.most_popular= req.body.most_popular;
        restaurant.favorite_dish= req.body.favorite_dish
      return user.save();
      })
      .then(function(user){
      res.redirect('/users/' + req.session.currentUser._id);
      })
      // console.log("Is it pushing?");
      // user.save(function(err){
      //   if (err) console.log(err);
      // })
      // console.log("I'm saving this!");
      //
    });
  // });
    // User.findByIdAndUpdate(req.session.currentUser._id.restaurants._id, {
    //   name: req.body.name,
    //   phone: req.body.phone,
    //   address: req.body.address,
    //   city: req.body.city,
    //   state: req.body.state,
    //   zip: req.body.zip,
    //   mfhours: req.body.mfhours,
    //   sathours: req.body.sathours,
    //   sunhours: req.body.sunhours,
    //   most_popular: req.body.most_popular,
    //   favorite_dish: req.body.favorite_dish
    // }, {new: true})
    // .exec(function(err, restaurant){
    //   if(err) {console.log(err);}
    //   console.log(restaurant);
    //   res.redirect('/:id');
    // });



//Removing a Restaurant from the list
router.delete('/:id', function(req,res){
  User.findByIdAndUpdate(req.session.currentUser._id, {
    $pull:{
     restaurants: {_id: req.params.id}
    }
  })
  .exec(function(err,restaurant){
    if(err) console.log(err);
    res.redirect('/users/' + req.session.currentUser._id);
  });
});



module.exports = router;
