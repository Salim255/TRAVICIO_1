const Profile = require('./../models/profileModel');



exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Messing name or price',
    });
  }
  next();
};

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

exports.createProfile = (req, res) => {
  res.status(201).json({
    status: "success",
    /* data:{
        profile: newProfile
    } */
 });
    
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

