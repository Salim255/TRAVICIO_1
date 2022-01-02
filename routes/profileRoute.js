const express = require('express');

const router = express.Router();

const authControler = require('../controlers/authControler');
const profileControler = require('../controlers/profileControler');

//params middleware
//router.param('id',profileControler.checkId);

router.route('/me')
    .get(authControler.protect,profileControler.getCurrrentUserProfile);
    

router
    .route('/top-5-cheap')
    .get(profileControler.aliasTopProfiles, profileControler.getAllProiles );

router.route('/profile-stats').get(profileControler.getProfileStats);

router.route('/')
    .get(authControler.protect,profileControler.getAllProiles)
    .post( authControler.protect, profileControler.createProfile)
    .patch(authControler.protect, profileControler.updateProfile);

router.route('/:id')
    .get(profileControler.getProfile)
    .patch(profileControler.updateProfile)
    .delete(authControler.protect, authControler.restrictTo('admin') , profileControler.deletProfile );


module.exports = router;