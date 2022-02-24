const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text:{
        type: String,
        required: [true, 'Text is required']
    },
    name:{
        type: String
    },
    avatar:{
        type: String
    },
    photo:{
        type: String
    },

    likes:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],

    comments: [
       { 
           user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
            },
            text:{
                type:String,
                required: true
            },
            name:{
                type: String
            },
            avatar:{
                type: String
            },
            photo:{
                type:String
            },
            date:{
                type: Date,
                default: Date.now
            }
    }
    ],
    date:{
        type: Date,
        default: Date.now
    }
});


PostSchema.pre(/^find/, function(next){
    /*  this.populate({
         path: 'profile',
         select: 'jobStatus'
     }).populate({
         path: 'user',
         select: 'firstName lastName avatar'
 
     }); */
     this.populate({
         path: 'user',
         select: 'firstName lastName  photo'
 
     });
    
     next();
 }); 

/*  PostSchema.post('save', function(){//post dont use next()
    //this.slug = slugify(this.name, {lower: true});
    this.comments.populate({
        path: 'user',
        select: 'firstName lastName  photo'

    });
    
}) */



const Post = mongoose.model('Post', PostSchema);
module.exports = Post ;
