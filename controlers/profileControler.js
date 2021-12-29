const Profile = require('../models/profileModel');
const APIFeatures = require('../utils/apiFeatures');
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



exports.createProfile = catchAsync(async (req, res, next) => {
  const newProfile = await Profile.create(req.body);
  res.status(201).json({
    status: "success",
     data:{
        profile: newProfile
      } 
    }); 
});

exports.getProfile = catchAsync(async(req, res, next) =>{
  const profile = await Profile.findById(req.params.id);
 
     res.status(200).json({
       status: 'success',
       data: {
         profile,
       },
     }); 
 });

exports.updateProfile = catchAsync(async (req, res, next) =>{
  const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,//This willll send us the new updated document
    runValidators: true
  });

  res.status(200).json({
    status:"success",
    data: {
        profile
    }
})    
});

exports.deletProfile =  catchAsync(async (req, res, next) =>{
   
  await Profile.findByIdAndDelete(req.params.id);
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


