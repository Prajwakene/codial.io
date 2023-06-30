//importing
const express = require('express');

const router = express.Router();

//mentioning the routes in the indexx folder
router.use('/posts', require('./posts'));
router.use('/users', require('./users'));

//exporting

module.exports = router;