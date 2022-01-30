//review /rating/ created at /ref to profile and user

const mongoose = require('mongoose');

const reviewSchema =new mongoose.Schema(
    {
        review:{
            type: String,
            required: [true, 'Review cant be empty']
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },

        createdAt:{
            type: Date,
            default: Date.now
        },
        profile:{
            type: mongoose.Schema.ObjectId,
            ref: 'Profile',
            required: [true, 'Review must belong to a tour.']
        },
        user:{
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to a user.']
        }

},
{
    toJSON:{virtuals: true},
    toObject:{virtuals: true}
  }
);

reviewSchema.pre(/^find/, function(next){
   /*  this.populate({
        path: 'profile',
        select: 'jobStatus'
    }).populate({
        path: 'user',
        select: 'firstName lastName avatar'

    }); */
    this.populate({
        path: 'user',
        select: 'firstName lastName avatar'

    });
    next();
}); 

const Review  = mongoose.model('Review', reviewSchema);

module.exports = Review;


//POST /profile/profilId/reviews
//GET/profile/profileId/rewiews
//GET/profile/profileId/rewiews/reviewId