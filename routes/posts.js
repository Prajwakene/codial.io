//creatingg routes for the post 
// accessing the route
const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_controller');


//now we can access all the action  that would be exported in the post controller 


//accessing 
router.post('/create', postController.create);

//exporting..
module.exports =router;
//to make this usanble we need to call this router from the index.js


