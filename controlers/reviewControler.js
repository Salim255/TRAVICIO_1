const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controlers/handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) =>{
    let filter
    if(req.params.profileId) filter = { profile: req.params.profileId };

     const reviews = await Review.find(filter);
     res.status(200).json({
         status: 'success',
         results: reviews.length,
         data:{
             reviews
         }
     });
});

exports. createReview = catchAsync(async(req, res, next) =>{

    //Nested routes
    if(!req.body.profile) req.body.profile = req.params.profileId;
    if(!req.body.user) req.body.user = req.user.id;

    const newReview =  await (await Review.create(req.body))
   
    res.status(200).json({
        status: 'success',
        data:{
            review:newReview
        }
    });
} );

exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

