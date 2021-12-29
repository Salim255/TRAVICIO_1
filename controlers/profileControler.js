const Profile = require('../models/profileModel');

//Routes handler
exports.getAllProiles =async (req, res) => {
  try {
      //Build query
      //1) Filtring
      const queryObj = { ...req.query };
      
      const excludedFields = ['page', 'sort', 'limit', 'field'];
      excludedFields.forEach(el => delete queryObj[el]);
      
      //2) Advanced filtring
      let queryStr  = JSON.stringify(queryObj);
      //console.log(queryStr);
      
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
      
  

      let query = Profile.find(JSON.parse(queryStr));
    
      //2)Sorting
      //sort=-ratingsAverage,price&location=madrid
      
      if(req.query.sort){
          const sortBy = req.query.sort.split(',').join(' ');
          //sort('ratingsAverage price')
          query = query.sort(sortBy);
          //sort('ratingsAverage price')
      }else{
        query = query.sort('-ratingsAverage');
      }
     
      //3) Field limiting
      if(req.query.fields){
        
          const fields = req.query.fields.split(',').join(' ');
          query = query.select(fields);
          console.log(fields);
      }else{
         query = query.select('-__v -education -skills');
      }
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

