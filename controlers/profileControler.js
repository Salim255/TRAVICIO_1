const Profile = require('../models/profileModel');
const APIFeatures = require('../utils/apiFeatures')
//Routes handler
exports.aliasTopProfiles = (req, res, next) =>{
  req.query.limit = '5',
  req.query.sort = '-ratingsAverage';
  next();
}



exports.getAllProiles =async (req, res) => {
  try {
      
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
  } catch (error) {
      res.status(404).json({
        status: 'faild',
        message: error
      })
  }
};



exports.createProfile = async (req, res) => {
  try {
    /* const newProfile = new Profile({
  });
  newProfile.save(); */

  const newProfile = await Profile.create(req.body);
  res.status(201).json({
    status: "success",
     data:{
        profile: newProfile
      } 
    });
   } catch (error) {
     res.status(400).json({
       status: 'faild',
       message: error
     })
  }
  
}

exports.getProfile = async(req, res) =>{
  try {
     const profile = await Profile.findById(req.params.id);
 
     res.status(200).json({
       status: 'success',
       data: {
         profile,
       },
     }); 
   } catch (error) {
        res.status(404).json({
          status:'fail',
          message: error
        })
   }
   
 };

exports.updateProfile = async (req, res) =>{
   try {
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
   } catch (error) {
      res.status(404).json({
        status:'fail',
        message: error
      })
   }
        
};

exports.deletProfile =  async (req, res) =>{
   
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status:"success",
      data: 
        null
      
  })
  } catch (error) {
  res.status(404).json({
    status:'fail',
    message: error
  })
 }
    
};

exports.getProfileStats = async (req, res) =>{
  try {
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
  } catch (error) {
    res.status(404).json({
      status:'fail',
      message: error
    })
   }
}


