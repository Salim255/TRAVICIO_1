const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync')

exports.getAllReviews = catchAsync(async (req, res, next) =>{
     const reviews = await Review.find();
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

    const newReview =  await Review.create(req.body);
   
    res.status(200).json({
        status: 'success',
        data:{
            review:newReview
        }
    });
} )
