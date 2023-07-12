//everytime we do the require ('express')it will not create new insstance ofexpress,,,it just fetch th eexixting instance
const express = require('express');

const router = express.Router();
const likesController = require('../controllers/likes_controller');

router.post('/toggle', likesController.toggleLike);  


module.exports = router;