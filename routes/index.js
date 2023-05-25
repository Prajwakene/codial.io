//everytime we do the require ('express')it will not create new insstance ofexpress,,,it just fetch th eexixting instance
const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log('router loaded')

//acessing the home controller actions
router.get('/', homeController.home
)
//export route
module.exports= router;
