//review /rating/ created at /ref to profile and user

const mongoose = require('mongoose');
const Profile = require('./profileModel');

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

reviewSchema.index({profile: 1, user: 1}, {unique: true});


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
        select: 'firstName lastName avatar photo'

    });
    next();
}); 

reviewSchema.pre('save', function(next) {  

      this.populate({
        path: 'user',
        select: 'firstName lastName avatar'
      
    });
    next();
  }
);

//Static methodes
reviewSchema.statics.calcAverageRatings = async function(profileId){
   
    const stats = await this.aggregate([
        {
          $match:{
            profile: profileId
          } 
         },
         {   
           $group:{
            _id: '$profile',
            nRating:{$sum: 1},
            avgRating:{$avg:'$rating'}
          }
        } 
     
      ]);
      
      if(stats.length > 0){
        await Profile.findByIdAndUpdate(profileId,{
          ratingsQuantity:stats[0].nRating,
          ratingsAverage:stats[0].avgRating
  
        } );
      }else{
        await Profile.findByIdAndUpdate(profileId,{
          ratingsQuantity:0,
        ratingsAverage: 4.5
      });
      }
      
}

  //DOCUMENT MIDDLEWARE: runs before .save() and create()
  reviewSchema.post('save', function(){//post dont use next()
      //this.slug = slugify(this.name, {lower: true});
      this.constructor.calcAverageRatings(this.profile);
      
  })
 


//findByIdAndUpdate
//findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next){
  
    if(this.r){
      this.r = await this.findOne();
    }
  next();
})
  
reviewSchema.post(/^findOneAnd/, async function(){
 
  if(this.r){await this.r.constructor.calcAverageRatings(this.r.profile);}
});


const Review  = mongoose.model('Review', reviewSchema);

module.exports = Review;


//POST /profile/profilId/reviews
//GET/profile/profileId/rewiews
//GET/profile/profileId/rewiews/reviewId