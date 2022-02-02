const multer  = require('multer');//we use it to pload files

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
//const { updateReview } = require('./reviewControler');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/img/users')
    },
    filename: (req, file, cb) =>{
        //user-id-333333.jpeg
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    }
});


//To chech if the uploaded file is an image
const multerFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
}

const upload = multer({ 
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

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
    if(req.file) filteredBody .photo = req.file.filename;

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

