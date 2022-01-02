const Profile = require('../models/profileModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
//Routes handler
exports.aliasTopProfiles = (req, res, next) =>{
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage';
  next();
}



exports.getAllProiles = catchAsync(async (req, res, next) => {
    //Excute query
    const features = new APIFeatures(Profile.find(), req.query)
    .filter()
    .sort()
    .limitFields().paginate();
    
    const profiles = await features.query;
    //Send response
     res.status(200).json({
       status: 'success',
       results: profiles.length,
       data: {
         profiles,
       }, 
     });
});

/* //great or update profile 
exports.createProfile = catchAsync(async (req, res, next) => {
  const {
  
    company,
    location,
    jobStatus,
    skills,
    bio,
    githubusername,
       youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    
    } = req.body;

    //Build profile object 
    const profileFields = {
  
    }
    profileFields.user = req.user._id;
    
    if(company) {
        profileFields.company = company;
    }
  
    if(location) {
        profileFields.location = location;
    }
    if(jobStatus) {
        profileFields.jobStatus = jobStatus;
    }
    if(bio) {
        profileFields.bio = bio;
    }
    if(githubusername) {
        profileFields.githubusername = githubusername;
    }

    if(skills){
    
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
  
  //Build social object
  profileFields.social = {};//intial
  if(youtube) profileFields.social.youtube = youtube;
  if(twitter) profileFields.social.youtube = twitter;
  if(facebook) profileFields.social.facebook = facebook;
  if(linkedin) profileFields.social.linkedin = linkedin;
  if(instagram) profileFields.social.instagram = instagram;
  

   

      let profile = await Profile.findOne({user: req.user._id});
      
      if(profile){
          //update profile
          profile = await Profile.findOneAndUpdate({ user: req.user._id }, {$set: profileFields}, {new: true});

          return res.status(201).json({
            status: "success",
             data:{
                profile
              } 
            }); 
      }

      //Create
    
      profile = new Profile(profileFields);
      //profile = await Profile.create(profileFields);
      await profile.save();
    
      res.status(201).json({
        status: "success",
         data:{
            profile
          } 
        }); 

  
  
});
 */

//Create or update profile
exports.createProfile = catchAsync(async (req, res, next) => {

  let profile = await Profile.findOne({user: req.user._id});
  if(profile){
    //update profile
    profile = await Profile.findOneAndUpdate({ user: req.user._id }, {$set: req.body}, {new: true, runValidators: true});

    return res.status(201).json({
      status: "success",
       data:{
          profile
        } 
      }); 
   }
  const body = req.body;
  body.user = req.user._id;
 const newProfile = await Profile.create(req.body);
 //newProfile.user = req.user._id;

 //console.log(req.user);
 res.status(201).json({
   status: "success",
    data:{
       profile: newProfile
     } 
   }); 
}); 

/*  exports.createProfile = catchAsync(async (req, res, next) => {
   const body = req.body;
   body.user = req.user._id;
  const newProfile = await Profile.create(req.body);
  //newProfile.user = req.user._id;

  //console.log(req.user);
  res.status(201).json({
    status: "success",
     data:{
        profile: newProfile
      } 
    }); 
});  */

exports.getProfile = catchAsync(async(req, res, next) => {
  const profile = await Profile.findById(req.params.id);
     if(!profile){
       return next(new AppError('No profile found with that ID', 404))
     }
     res.status(200).json({
       status: 'success',
       data: {
         profile,
       },
     }); 
 });
/* exports.getProfile = catchAsync(async(req, res, next) => {
  const profile = await Profile.findById(req.params.id);
     if(!profile){
       return next(new AppError('No profile found with that ID', 404))
     }
     res.status(200).json({
       status: 'success',
       data: {
         profile,
       },
     }); 
 }); */

exports.updateProfile = catchAsync(async (req, res, next) =>{
  const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,//This willll send us the new updated document
    runValidators: true
  });

  if(!profile){
    return next(new AppError('No profile found with that ID', 404))
  }

  res.status(200).json({
    status:"success",
    data: {
        profile
    }
})    
});

exports.deletProfile =  catchAsync(async (req, res, next) =>{
   
  const profile = await Profile.findByIdAndDelete(req.params.id);

  if(!profile){
    return next(new AppError('No profile found with that ID', 404))
  }

  res.status(200).json({
    status:"success",
    data: 
      null
    
})  
});

exports.getProfileStats = catchAsync(async (req, res, next) =>{
  const stats =  await Profile.aggregate([
    {
      $match:{
        ratingsAverage:{ $gte: 4.5 }
      }
    },
    {
        $group: {
           _id:{$toUpper: '$jobStatus'} , 
           numProfiles: { $sum: 1},
           numRating: { $sum: '$ratingsQuantity'},
           avgRating: { $avg: '$ratingsAverage'},
        }
    },
    {
      $sort:{
        avgRating :1
      }
    },
   /*  {
      $match: { _id: { $ne: 'BEAKER' } }
    } */
    
  ]);
  res.status(200).json({
    status:"success",
    data: 
      {
        stats
      }
    
})
});


//1route Get api/profiles/me
//2description Get current user profile 
//3access Public
exports.getCurrrentUserProfile = catchAsync(async(req, res, next) =>{
  
    const profile = await Profile.findOne({ user: req.user._id }).populate('user',['firstName', 'avatar']);
    
    if(!profile){
      return next(new AppError('There is no profile for this user', 400));
    }

    res.status(200).json({
      status:"success",
      data: {
          profile
      }
  }) 
})