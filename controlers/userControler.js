const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

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

