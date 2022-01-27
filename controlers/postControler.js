const Profile = require('../models/profileModel');
const User = require('../models/userModel');
const Post  =  require('../models/postModel');

const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const router = require('../routes/postRoute');

//POST api/v1/posts
//Creat a userPost
//Privite
exports.creatpost = catchAsync(async (req, res, next) =>{
     const user = await User.findById(req.user.id);
   
     const newPost = new Post({
          text: req.body.text,
          name: user.firstName,
          avatar: user.avatar,
          user: req.user.id
     });


     const post = await newPost.save();
     res.status(200).json({
          status: 'success',
          data:{
               post
          }
     })
});

//GET api/v1/posts
//Get all posts
//Privite
exports.getAllPosts = catchAsync(async (req, res, next) =>{
     const posts = await Post.find().sort({data: -1});
     res.status(200).json({
          status: 'success',
          data:{
               posts
          }
     })
});

//Get api/posts/:id
//Get post by post id
//Privite
exports.getPostById = catchAsync( async(req, res, next) => {
     
     const post = await Post.findById(req.params.id);

     if(!post){
          return next(new AppError('Post not found', 404));
     }

     res.status(200).json({
          status: 'success',
          data:{
               post
          }
     })
});

//delete api/posts/:id
//delete post by Id
//Privite
exports.deletePostById  = catchAsync(async(req, res, next) =>{
     
     const post = await Post.findById(req.params.id);
     if(!post){
          return next( new AppError('Post not found', 404));
      }

      //Check user
      if(post.user.toString() !== req.user.id){
          return res.status(400).json({ 
               status: 'fail',
               message: 'User not authorized'
           });
     }

     await post.remove();

     res.status(200).json({
          status: 'success',
          message:' Post removed'
     })
});

//PUT api/posts/like/:id
//Like a post
//Privite
exports.likePostById = catchAsync(async(req, res, next) =>{
     const post = await Post.findById(req.params.id);
       //Ckeck if the post has already been liked
     if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
          return res.status(400).json({ message: 'Post already liked' });
      }
      post.likes.unshift({ user: req.user.id });//put in the beggining 
      await post.save();
      res.status(200).json({
           status: 'success',
           data:{
              data: post.likes
           }
      });
})

//Put api/posts/unlike/:id
//UNLike a post
//Privite
exports.unlikePostById = catchAsync( async(req, res, next) =>{
     const post = await Post.findById(req.params.id);

     //Ckeck if the post has already been liked
     if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
          return res.status(400).json({ message: 'Post has not yet been liked' });
      }
      //Get remove index
      const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);
      
      await post.save();
      res.status(200).json(post.likes);
});

//1route POST api/posts/comment/:id
//2description Comment on  a post 
//3access Private
exports.addCommentOnPost = catchAsync( async(req, res, next) => {
    
     const user = await User.findById(req.user.id);
     const post = await Post.findById(req.params.id);
     
     const newComment = new Post({
          text: req.body.text,
          name: user.firstName,
          avatar: user.avatar,
          user: req.user.id
     }) ;
     post.comments.unshift(newComment);

     await post.save();

     res.status(200).json({
          status: 'success',
          data:{
              data: post.comments
          }
     });
});

//1route DELET api/posts/comment/:id/:comment_id
//2description delete Comment on  a post 
//3access Private

exports.deleteCommentOnPostById = catchAsync(async(req, res, next) =>{
       const post = await Post.findById(req.params.id);

        //PULL out comment from the post
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        
        //Make sure comment exist
        if(!comment){
            return res.status(404).json({
                status: 'fail',
                message: 'Comment does not exist'
            })
        };

        //Check User
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({
                status: 'fail',
                message: 'User not authorized'
            });
        }

        //Get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        
        await post.save();
        res.status(200).json({
             status: 'success',
             data:{
               data: post.comments
             }
        });
})