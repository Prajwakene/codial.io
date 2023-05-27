// accessing the route
const express = require('express');
const router = express.Router();

//acessing the neighbour and child of the controlller
// ../means => one step up
const usersController = require('../controllers/users_controller');

// mapping the route user action
router.get ('/profile', usersController.profile);

// exporting
module.exports = router;