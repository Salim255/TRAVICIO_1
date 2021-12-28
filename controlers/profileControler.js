const Profile = require('../models/profileModel');





//Routes handler
exports.getAllProiles = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    /* results: profiles.length,
    data: {
      profiles,
    }, */
  });
};

exports.getProfile = (req, res) =>{
  //const { id } = req.params;
  /* const profile = profiles.find((el) => el._id === id);
  res.status(200).json({
    status: 'success',
    data: {
      profile,
    },
  }); */
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

exports.updateProfile =  (req, res) =>{
   
        res.status(204).json({
            status:"success",
            data:{
                profile: 'Update this proile'
            }
             
            
        })
};

exports.deletProfile = (req, res) =>{
   
        res.status(204).json({
            status:"success",
            data:
                null
            
        })
}

