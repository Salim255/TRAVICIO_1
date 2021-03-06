const mongoose = require('mongoose');
const slugify = require('slugify');//to convert the inputs to lower case
const validator = require('validator');

const profileSchema = new mongoose.Schema({
  /*    name: {
      type: String,
      required: [true, 'Profile must have a name'],
      //unique: true,
     /*  maxlength:[40, 'A name must have less or equal than 40 characters'],
      minlength:[10 ,'A name must have more or equal thean 40 characters'], 
      validate: [validator.isAlpha, 'Name must only contain characters']
   }, 
   */
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
   }, 
   rating:{
        type: Number,
        min:1,
        max: 5
   },
   slug: String,
  
  
    phone:{
        type: Number
    },
    company: {
      type: String
    },
    location: {
      type: String,
      required: [true, 'Profile must have a location']
    },
    citySide:{
        type: String,
        enum: ['center','east', 'west', 'north', 'west']
    },
    jobStatus: {
      type: String,
      required: [true, 'Job status is required']
    },
    jobCategory: {
          type: String
    },
    skills: {
      type: [String],
      required: true
    },
    bio: {
      type: String,
      trim: true
    },
    ratingsAverage:{
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val *10) / 10 ,//4.6666 =>4.7
    },
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    hourlyWage:{
      type: String,
    },
    jobMinimumPay: {
      type: Number,
      required: true
    },
    portfolioImages:[String],
    experience: [
      {
        title: {
          type: String,
          required: true
        },
        company: {
          type: String,
          required: true
        },
        location: {
          type: String
        },
        from: {
          type: Date,
          //required: true
        },
        to: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description: {
          type: String,
          trim: true
        }
      }
    ],
    education: [
      {
        school: {
          type: String,
          required: true
        },
        degree: {
          type: String,
          required: true
        },
        fieldofstudy: {
          type: String,
          required: true
        },
        from: {
          type: Date,
         // required: true
        },
        to: {
          type: Date
        },
        current: {
          type: Boolean,
          default: false
        },
        description: {
          type: String,
          trim: true
        }
      }
    ],
    social: {
      
      twitter: {
        type: String
      },
      facebook: {
        type: String
      },
      linkedin: {
        type: String
      },
      instagram: {
        type: String
      }
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select:false,
    },
    
  },
  {
    toJSON:{virtuals: true},
    toObject:{virtuals: true}
  }
  );

profileSchema.index({jobMinimumPay: 1, ratingsAverage: -1});
profileSchema.index({slug: 1});

//Virtual populate middleware
profileSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'profile',//The filed in the other model"in the reviewmodle
  localField: '_id'
} );

  //DOCUMENT MIDDLEWARE: runs before .save() and create()
/*  profileSchema.pre('save', function(next) {
      //this.slug = slugify(this.name, {lower: true});
      this.jobStatus = this.jobStatus.toLowerCase();
      this.location = this.location.toLowerCase();
      this.jobCategory = this.jobCategory.toLowerCase();
      
      next();
  });  */


  const Profile = mongoose.model('Profile', profileSchema);
  
  module.exports = Profile;