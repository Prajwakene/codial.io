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

//for any further route , access from here
// router.use('/routerName', require('./routerfile'));


//export route
module.exports= router;

