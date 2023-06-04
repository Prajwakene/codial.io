// accessing the route
const express = require('express');
const router = express.Router();
//importing passport 
const passport = require('passport');

//acessing the neighbour and child of the controlller
// ../means => one step up
const usersController = require('../controllers/users_controller');

// mapping the route user action
router.get ('/profile',passport.checkAuthentication, usersController.profile);

//for sign up
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);


//matching the router for the sign up page
router.post('/create', usersController.create);

//use passport as a middleware to authenticate ...it can take three argument 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'users/sign-in'}
    ), usersController.createSession);


    //creating an router for the signout
    router.get('/sign-out', usersController.destroySession);

// exporting
module.exports = router;