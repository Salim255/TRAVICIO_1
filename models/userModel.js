const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:[true, 'Please tell us your first name!']
    },
    lastName:{
        type: String,
        required:[true, 'Please tell us your last name!']
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
            required: [true, 'Please confirm your password']
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

const User = mongoose.model('User', UserSchema);
module.exports = User;