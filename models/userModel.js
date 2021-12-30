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
        unique:true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valide email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    },
    passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                //This only work on creat on save!!!
                validator: function (el) {
                    return el === this.password;
                },
                message: 'Passwords are not the same'
            }
    },
    avatar:{//Its allow  to attach a profile image to your email
        type:String,//
    },
    photo: String,
    date:{
        type:Date,
        default: Date.now
    }
})

 //DOCUMENT MIDDLEWARE: runs before .save() and create()

 UserSchema.pre('save', async function(next) {
    this.avatar = gravatar.url(this.email, {s: '200',r:'pg', d:'mm'});
   

    //Only run this fucntion if the passwword is modified
    if(!this.isModified('password')){
        return next();
    }
    /* const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt); */
    //Encrypt the password
    this.password = await bcrypt.hash(this.password, 12);
    //Delete the password confirm
    this.passwordConfirm = undefined;
    next();
});


const User = mongoose.model('User', UserSchema);
module.exports = User;