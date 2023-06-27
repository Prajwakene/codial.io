//importing
const express = require('express');

const router = express.Router();


router.use('/posts', require('./posts') )
//exporting

module.exports = router;