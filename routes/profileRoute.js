const express = require('express');

const router = express.Router();

const authControler = require('../controlers/authControler');
const profileControler = require('../controlers/profileControler');

//params middleware
//router.param('id',profileControler.checkId);
router
    .route('/top-5-cheap')
    .get(profileControler.aliasTopProfiles, profileControler.getAllProiles );

router.route('/profile-stats').get(profileControler.getProfileStats);

router.route('/')
    .get(authControler.protect,profileControler.getAllProiles)
    .post(profileControler.createProfile);

router.route('/:id')
    .get(profileControler.getProfile)
    .patch(profileControler.updateProfile)
    .delete(profileControler.deletProfile);


module.exports = router;