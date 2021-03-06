const multer  = require('multer');//we use it to pload files
const sharp = require('sharp');//to images proccessing libary
//const mysql = require('mysql');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const crypto = require('crypto');
const path = require('path');
const {GridFsStorage} = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

dotenv.config({ path: './config.env' }); //This will read this file and then save the varaiable in the enveroment variable
//const { updateReview } = require('./reviewControler');

/* const multerStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/img/users')
    },
    filename: (req, file, cb) =>{
        //user-id-333333.jpeg
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    }
}); */
const multerStorage = multer.memoryStorage();//the image will be saved as a buffer

//To chech if the uploaded file is an image
const multerFilter = (req, file, cb) =>{
   
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }

}
const mongoUrl = process.env.DATASBASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const conn = mongoose.createConnection(mongoUrl);

//init gfs
let gfs;
conn.once('open', ()=> {
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');//most match the bucketName
})



//Create storage engine
let filename ;
const mogoStorage = new GridFsStorage({
    url: mongoUrl,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          filename = buf.toString('hex') + path.extname(file.originalname);
          //req.file.filename = filename;
        
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);

        });
      });
    }
  });


const upload = multer({ 
    storage: mogoStorage,
    fileFilter: multerFilter
}); 



exports.uploadUserPhoto = upload.single('photo');


exports.resizeUserPhoto = (req, res, next) =>{
    if(!req.file) return next();
   
    //req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    req.file.filename = filename;
  
     sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({quality: 90})
    next(); 
}


const filterObj = (obj, ...allowedFields) =>{
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
} 
//USERS
exports.getAllUsers = catchAsync(
    async (req, res, next) =>{
        
        const users = await User.find();
        res.status(200).json({
            status:"success",
            data: {
                users
            }
        });
    }
)


exports.updateMe = catchAsync(async (req, res, next) =>{
    
    //1) Create error if user post password
    if(req.body.password || req.body.passwordConfirm){
        return next(new AppError('This route is not for password update. Please use /updateMyPassword.', 400))
    }
    //Filterout unwanted fields name.
    const filteredBody = filterObj(req.body, 'firstName','lastName', 'email');

    //Save the image name in our user data base
    

    if(req.file) filteredBody.photo = req.file.filename;

    //3)Update the user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {new: true, runValidators: true });
   
    res.status(200).json({
        status: 'success',
        user: updatedUser
    });

});


exports.getUser = catchAsync( async (req, res, next) => {
    
    
    const user = await User.findById(req.user.id);
    res.status(200).json({
        status:"success",
        data: {
            user
        }
    });
} )
exports.createUser = (req, res) =>{
    
    res.status(200).json({
        status:"error",
        message: "This route is not yet defined"
    });
}; 

exports.updateUser = (req, res) =>{
    res.status(200).json({
        status:"error",
        message: "This route is not yet defined"
    });
}; 

exports.deleteUser = (req, res) =>{
    res.status(500).json({
        status:"error",
        message: "This route is not yet defined"
    });
}; 

