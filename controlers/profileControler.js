const Profile = require('../models/profileModel');

//Routes handler
exports.getAllProiles =async (req, res) => {
  try {
      const profiles = await Profile.find();
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
       message: 'Invalid datat sent'
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

exports.deletProfile = (req, res) =>{
   
        res.status(204).json({
            status:"success",
            data:
                null
            
        })
}

