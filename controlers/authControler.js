const { promisify } = require('util');//to promisify method, its async fun

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (payload ) => {
return  jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN });
}


exports.signup = catchAsync(async (req, res, next) =>{
    
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt
    });

    const payload = {
            id: newUser._id
    };
    

    const token = signToken(payload);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
    
});


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    //1)Check if email and password exist
    if(!email || !password){
       return  next(new AppError('Please provide email and password', 404));
    }

    //2)Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    
    
     if(!user || ! await user.correctPassword(password, user.password)){
        return  next(new AppError('Incorrect email or password', 401));
     }   

    //3)if everything ok, send token to client
    const payload = {
        id: user._id
     };

    const token = signToken(payload);

    res.status(200).json({
        statsu: 'success',
        token,
        

    })
});

exports.protect = catchAsync( async (req, res, next) =>{
    //1)Get the token and check is it exist 
    
    let token
   
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next( new AppError('You are not logged in ! Please login to get access.', 401));
    }

    //2)Vefication the token , compare the the id with the id who create the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3)Check if user still  exists
    const freshUser = await User.findById(decoded.id);
    if(!freshUser){
        return next( new AppError('The user belogging to this token does no longer exist.', 401));
    }
    //4)Check if user changed password after the toekn was issued

   /*  if(freshUser.changedPasswordAfter(decoded.iat)){
         return next(new AppError('User recently changed password! Please log in again', 401));
    } */

    //GRANT ACCESSS TO Protected Route
    req.user = freshUser;
    next();
});

exports.restrictTo =(...roles) => {
       return (req, res, next) => {
        //roles ['admin'], role='user'
        if(!roles.includes(req.user.role)){
            return next(
                new AppError('You do not have permission to perform this action', 403)
                );
        }
        next();
    };
};
   
 