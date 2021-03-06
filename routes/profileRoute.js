const express = require('express');
const multer  = require('multer');//we use it to pload files

const upload = multer({ dest: 'public/img/users'});
const router = express.Router();

const authControler = require('../controlers/authControler');
const profileControler = require('../controlers/profileControler');
const reviewControler =require('../controlers/reviewControler');
const reviewRouter = require('./reviewRoute');

//params middleware
//router.param('id',profileControler.checkId);

//POST /profile/profilId/reviews

router.use('/:profileId/reviews', reviewRouter)

router.route('/me')
    .get(authControler.protect, profileControler.getCurrrentUserProfile)
    .delete(authControler.protect, profileControler.deletUserProfile);
    

router
    .route('/top-5-cheap')
    .get(profileControler.aliasTopProfiles, profileControler.getAllProiles );

router.route('/profile-stats').get(profileControler.getProfileStats);

router.route('/')
    .get(profileControler.getAllProiles)
    .post( authControler.protect, profileControler.createProfile)
    .patch(authControler.protect, profileControler.updateProfile)
    .delete(authControler.protect , profileControler.deletProfile );

    
router.route('/user/:user_id')
        .get(profileControler.getProfileById);

router.route('/:id')
    .get(profileControler.getProfile)
    .patch(profileControler.updateProfile)
    .delete(authControler.protect, authControler.restrictTo('admin') , profileControler.deletProfile );

router.route('/experience')
    .put(authControler.protect, profileControler.addExperience);

router.route('/experience/:exp_id')
    .delete(authControler.protect, profileControler.deleteExperience);

    router.route('/education')
    .put(authControler.protect, profileControler.addEducation);

router.route('/education/:edu_id')
    .delete(authControler.protect, profileControler.deleteEducation);



module.exports = router;