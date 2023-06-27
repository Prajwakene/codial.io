//importing
const express = require('express');

const router = express.Router();

//we need post api controller
const postsApi = require('../../../controllers/api/v1/posts_api')

router.get('/', postsApi.index);
//exporting

module.exports = router;