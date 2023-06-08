//creatingg routes for the post 
// accessing the route
const express = require('express');
const router = express.Router();

//we are telling passport to authenticate user
const passport =  require('passport')

const commentsController = require('../controllers/comments_controller');


//now we can access all the action  that would be exported in the post controller 


//accessing 
router.post('/create',passport.checkAuthentication, commentsController.create);

//exporting..
module.exports =router;
//to make this usanble we need to call this router from the index.js