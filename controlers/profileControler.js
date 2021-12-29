const Profile = require('../models/profileModel');

//Routes handler
exports.getAllProiles =async (req, res) => {
  try {
      //Build query
      const queryObj = { ...req.query };
      const excludedFields = ['page', 'sort', 'limit', 'field'];
      excludedFields.forEach(el => delete queryObj[el]);
      
      const query = Profile.find(queryObj);
     /*  const query = await Profile.find().where('location').equals('madrid').where('jobStatus').equals('developer'); */

     //Excute query
     const profiles = await query;

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
    
}

