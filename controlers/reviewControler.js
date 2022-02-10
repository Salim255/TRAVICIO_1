const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

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
    
    if(!req.body.rating || !req.body.review ){
        return next(new AppError('Feedback must have rating and review', 404))
      }
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

