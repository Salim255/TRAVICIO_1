const crypto = require('crypto')
const mongoose = require('mongoose');
const validator = require('validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:[true, 'First name is required!']
    },
    lastName:{
        type: String,
        required:[true, 'Last name is required!']
    },
    email:{
        type: String,
        required:true,
        unique:[true, 'This email is already in use'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valide email']
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                //This only work on creat on save!!!
                validator: function (el) {
                    console.log("🌒🌎");
                    return el === this.password;
                },
                message: 'Passwords are not the same'
            }
    },
    avatar:{//Its allow  to attach a profile image to your email
        type:String,//
    },
    photo:{
        type: String
    } ,
    date:{
        type:Date,
        default: Date.now
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordRestExpires: Date
})

 //DOCUMENT MIDDLEWARE: runs before .save() and create()

 UserSchema.pre('save', async function(next) {
    this.avatar = gravatar.url(this.email, {s: '200',r:'pg', d:'mm'});
   

    //Only run this fucntion if the passwword is modified
    if(!this.isModified('password')){
        return next();
    }
    this.passwordChangedAt = Date.now() - 1000;

    /* const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt); */
    //Encrypt the password
    this.password = await bcrypt.hash(this.password, 12);
    //Delete the password confirm
    this.passwordConfirm = undefined;
    next();
});

UserSchema.pre('save', async function(next){
     //Only run this fucntion if the passwword is modified
     if(!this.isModified('password') || this.isNew){
        return next();
    }
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

//instance methode will be avalable on all the user document
UserSchema.methods.correctPassword = async function(candidatePassword, userPassword){

    return  await bcrypt.compare(candidatePassword, userPassword);
}

UserSchema.methods.changedPasswordAfter = async function(JWTTimestamp){
    
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        
        return JWTTimestamp > changedTimestamp;
    }
    return false;
} 

UserSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this. passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordRestExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;