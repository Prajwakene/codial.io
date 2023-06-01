// accessing the route
const express = require('express');
const router = express.Router();

//acessing the neighbour and child of the controlller
// ../means => one step up
const usersController = require('../controllers/users_controller');

// mapping the route user action
router.get ('/profile', usersController.profile);

//for sign up
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);


//matching the router for the sign up page
router.post('/create', usersController.create);


// exporting
module.exports = router;