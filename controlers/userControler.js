const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { updateReview } = require('./reviewControler');

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

    console.log(req.file);
    console.log(req.body);
    //1) Create error if user post password
    if(req.body.password || req.body.passwordConfirm){
        return next(new AppError('This route is not for password update. Please use /updateMyPassword.', 400))
    }
    //Filterout unwanted fields name.
    const filteredBody = filterObj(req.body, 'firstName','lastName','photo', 'email', 'photo');

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

