//importing
const express = require('express');

const router = express.Router();

//imprting passport
const passport = require('passport');
//we need post api controller
const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/', postsApi.index);
//exporting
// making the delete route
//authentication the strategy is jwt
// sesssion false beacause i do not wantt to be session cookie to be generated
router.delete('/:id',passport.authenticate('jwt, {session: false}'), postsApi.destroy);

module.exports = router;