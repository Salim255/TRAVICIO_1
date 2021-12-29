const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Profile must have a name'],
      unique: true,
   },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }, 
  
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
    jobStatus: {
      type: String,
      required: [true, 'Job status is required']
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
        default: 4.5
    },
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    hourlyWage:[
      {
        jobMinimumPay: {
          type: Number,
          required: true
        },
        negotiable:{
          type: String
        }
    }
      
   ],
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
          required: true
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
          required: true
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

  });
  
  const Profile = mongoose.model('Profile', profileSchema);
  
  module.exports = Profile;