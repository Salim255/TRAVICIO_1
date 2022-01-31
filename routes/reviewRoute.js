const express = require('express');
const reviewControler = require('../controlers/reviewControler');
const authControler = require('../controlers/authControler');

const router =  express.Router({mergeParams: true});

//POST /profile/profilId/reviews
//GET/profile/profileId/rewiews
//POST/reviews

router
     .route('/')
     .get(reviewControler.getAllReviews)
     .post(authControler.protect,authControler.restrictTo('user'), reviewControler.createReview);

router
     .route('/:id')
     .patch(reviewControler.updateReview)
     .delete(reviewControler.deleteReview)
module.exports = router;