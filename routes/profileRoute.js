const express = require('express');
const router = express.Router();
const profileControler = require('../controlers/profileControler');

//params middleware
//router.param('id',profileControler.checkId);

router.route('/')
    .get(profileControler.getAllProiles)
    .post(profileControler.checkBody,profileControler.createProfile);

router.route('/:id')
    .get(profileControler.getProfile)
    .patch(profileControler.updateProfile)
    .delete(profileControler.deletProfile);


module.exports = router;