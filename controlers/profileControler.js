const fs = require('fs');

const profiles = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.checkId = (req, res, next, val) => {
  const id = val * 1;
  console.log(`Profile id is ${val}`);
  if (id > profiles.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  next();
};

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
    results: profiles.length,
    data: {
      profiles,
    },
  });
};

exports.getProfile = (req, res) =>{
  const { id } = req.params;
  const profile = profiles.find((el) => el._id === id);
  res.status(200).json({
    status: 'success',
    data: {
      profile,
    },
  });
};

exports.createProfile = (req, res) => {
  console.log(req.body);
  const newId = profiles[profiles.length - 1]._id + 1;
  const newProfile = Object.assign({_id: newId}, req.body);
    profiles.push(newProfile);
    fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(profiles), () =>{
             res.status(201).json({
                 status: "success",
                 data:{
                     profile: newProfile
                 }
             })
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

