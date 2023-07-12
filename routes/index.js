//everytime we do the require ('express')it will not create new insstance ofexpress,,,it just fetch th eexixting instance
const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log('router loaded')

//acessing the home controller actions using get request
router.get('/', homeController.home);

//acesssng the other all route
//acessing the user route 
router.use('/users', require('./users'));

// calling the post route
router.use('/posts', require('./posts'));

// calling the comment route
router.use('/comments', require('./comments'));

//
router.use('/likes',require('./likes'))
//for any further route , access from here
// router.use('/routerName', require('./routerfile'));

//for using the index file under the api folder in same router folder
router.use('/api', require('./api'));

//export route
module.exports= router;