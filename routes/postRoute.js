const express = require('express');

const router = express.Router();

const authControler = require('../controlers/authControler');
const postControler = require('../controlers/postControler');

router.route('/').post(postControler.creatpost);


module.exports = router;