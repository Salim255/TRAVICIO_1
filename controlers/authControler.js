const { promisify } = require('util');//to promisify method, its async fun
const crypto = require("crypto");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
//const sendEmail = require('../utils/email');
const Email = require('../utils/email');


const signToken = (payload ) => {
return  jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN });
}

const createSendToken = (user, statusCode, res ) =>{
    const payload = {
        id: user._id
        };
       const token = signToken(payload);
       res.status(statusCode).json({
           statsu: 'success',
           token,
       });
}

exports.signup = catchAsync(async (req, res, next) =>{
    
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        photo: req.body.photo
    });
  /*  const url = `${req.protocol}://${req.get('host')}/dashboard`; */
  const url = `${req.protocol}://localhost:3006/dashboard`;
   console.log(url);
   await new Email(newUser, url).sendWelcome();
    //createSendToken(newUser, 201, res);
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
        

    });
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

exports.forgetPassword = catchAsync(async (req, res, next) => {
    //1)Get user based on POSTED EMAIl
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new AppError('There is no user with email address', 404));
    }
    //2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });
    
    //Send it to user's email
 
   
   /*  const message = `Forget your password? Submit a PATCH request with new password and passwordConfirm to: ${resetURL}.\nIf you didn't forgot your password, please ignore this email! `; */
   
    try{
        
      /*   await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valide for 10min)',
            message
        }); */
        const resetURL = `${req.protocol}://${req.get('host')}//api/v1/users/resetPassword/${resetToken}`;

        await new Email(user, resetURL).sendPasswordReset();
    
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
        })
    }catch(err){
        user.passwordResetToken = undefined;
        user.passwordRestExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next( new AppError('There was an error sending the email. try agail later!'), 500);
    }
    

});
 
exports.resetPassword = catchAsync(async(req, res, next) => {
    //1)Get user based on the token 
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');


    const user = await User.findOne({passwordResetToken: hashedToken, passwordRestExpires: {$gt: Date.now()} })
    //2)If the token not expired, and there is user, set the new password
    if(!user){
        return next(new AppError('Token is invalid or has expired', 400))
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordRestExpires = undefined;
  
    await user.save();

    //3)Update changedPasswordAt property for the user


   //4)Log the user in , send the JWT
   const payload = {
    id: user._id
    };
   const token = signToken(payload);
   res.status(200).json({
       statsu: 'success',
       token,
       

   });
});

exports.updatePassword = catchAsync(async(req, res, next) =>{
    //1)Get the user from collection
    const user = await User.findById(req.user.id).select('+password');
    //2)Check if the POSTed current password is correct
 
   if(!( await user.correctPassword(req.body.passwordCurrent, user.password))){
        return next(new AppError('Your current password is wrong.', 401));
    } 
    //3)If so, update password
    user.password = req.body.password;
    user.passwordConfirm= req.body.passwordConfirm;
    await user.save();
    //4)Log the user in, send JWT
    const payload = {
        id: user._id
        };
       const token = signToken(payload);
       res.status(200).json({
           statsu: 'success',
           token,
           
    
       });
});