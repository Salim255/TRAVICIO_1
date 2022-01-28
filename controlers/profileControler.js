const Profile = require('../models/profileModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Post = require('../models/postModel');
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
    
    const profiles = await features.query.populate('user', ['firstName','lastName' ,'avatar', 'email']);
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

 //Get profiel by user id
 exports.getProfileById = catchAsync(async(req, res, next) => {
  
  const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['firstName','lastName' ,'avatar', 'email']);
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

//1route Delete api/profile
//2description Delet profile, user & posts  
//3access Private
exports.deletUserProfile =  catchAsync(async (req, res, next) =>{
   
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

//1route Delete api/profile
//2description Delet profile, user & posts  
//3access Private
exports.deletProfile =  catchAsync(async (req, res, next) =>{  

  //Remove user posts
  await Post.deleteMany({ user: req.user.id });
 //Remove profile 
 await Profile.findOneAndRemove({ user: req.user.id });
 //await Profile.findOnedAndRemove({ user: req.user._id });

    //Remove user
  await User.findOneAndRemove({ _id: req.user._id });
    

  res.status(200).json({
    status:"success",
    data: 
      null
    
})  
});
/* exports.deletProfile =  catchAsync(async (req, res, next) =>{
   
  const profile = await Profile.findByIdAndDelete(req.params.id);

  if(!profile){
    return next(new AppError('No profile found with that ID', 404))
  }

  res.status(200).json({
    status:"success",
    data: 
      null
    
})  
}); */

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
});


//Route api/profile/experience
//Add profile experience
//privite
exports.addExperience = catchAsync( async(req, res, next) => {
   const profile  = await Profile.findOne({user: req.user.id});
    profile.experience.unshift(req.body);
    await profile.save();

   res.status(200).json({
    status:"success",
    data: {
        profile
    }
   }) 
});


//Route api/profile/experience/:exp_id
//delete  profile experience
//privite
exports.deleteExperience = catchAsync( async(req, res, next) => {
  const profile  = await Profile.findOne({user: req.user.id});

  //Get remeove index
  const removeIndex = profile.experience.map(item =>item.id).indexOf(req.params.exp_id);
        
   profile.experience.splice(removeIndex, 1);//reomve the exprice with the index
    await profile.save();
  res.status(200).json({
   status:"success",
   data: {
       profile
   }
  }) 
});

//Route api/profile/education
//Add profile experience
//privite
exports.addEducation = catchAsync( async(req, res, next) => {
  const profile  = await Profile.findOne({user: req.user.id});
   profile.education.unshift(req.body);
   await profile.save();

  res.status(200).json({
   status:"success",
   data: {
       profile
   }
  }) 
});


//Route api/profile/education/:edu_id
//delete  profile education
//privite
exports.deleteEducation = catchAsync( async(req, res, next) => {
 const profile  = await Profile.findOne({user: req.user.id});

 //Get remeove index
 const removeIndex = profile.education.map(item =>item.id).indexOf(req.params.exp_id);
       
  profile.education.splice(removeIndex, 1);//reomve the exprice with the index
  await profile.save();
 res.status(200).json({
  status:"success",
  data: {
      profile
  }
 }) 
});