const express = require('express');
const reviewControler = require('../controlers/reviewControler');
const authControler = require('../controlers/authControler');

const router =  express.Router()

router
     .route('/')
     .get(reviewControler.getAllReviews)
     .post(authControler.protect,authControler.restrictTo('user'), reviewControler.createReview);

module.exports = router;