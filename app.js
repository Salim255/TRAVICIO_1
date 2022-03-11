const express = require('express');
const path = require('path');
const sharp = require('sharp');//to images proccessing libary
const resize = require('resizer-stream');
const mongoose = require('mongoose');



const grid = require('gridfs-stream');

const app = express();
const morgan = require('morgan');
const compression = require('compression');
const globalErrorHandler =  require('./controlers/errorControler');
const AppError = require('./utils/appError');


const profileRouter = require('./routes/profileRoute');
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
const reviewRouter = require('./routes/reviewRoute');
const userControler =  require('./controlers/userControler');

const mongoUrl = process.env.DATASBASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const conn = mongoose.createConnection(mongoUrl);

//init gfs
let gfs;
conn.once('open', ()=> {
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');//most match the bucketName
})

//Mddleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //3de middle were
 
}

app.use(express.json()); //will put the data coming from body in req object(parse the data from the body)

//app.use(express.static(`${__dirname}/public`));
//app.use(compression());//will compress all the files send to th eclient

app.use((req, res, next) => {

  req.requestTime = new Date().toISOString();
  
  next();
});



//////END MIDDLEWARE
//Mounting new router in the route
app.use('/api/v1/profiles', profileRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/reviews', reviewRouter);



//Display single file
app.get('/api/v1/files/:filename',  (req, res) =>{
  gfs.files.findOne({filename: req.params.filename},(err, file) => {
    if(!file || file.length === 0){
         return res.status(404).json({
           err: 'No files exists'
         });
    }
   console.log(file);
   //File exist
   return res.json(file);
  })
});

//Display the image
app.get('/api/v1/image/:filename',  (req, res) =>{
  gfs.files.findOne({filename: req.params.filename},(err, file) => {
    if(!file || file.length === 0){
         return res.status(404).json({
           err: 'No files exists'
         });
    }
   //Check if its image
   if(file.contentType === 'image/jpeg'){
     //Read the output to browser
     const readstream = gfs.createReadStream(file.filename);

  
     //.pipe(resize({ width: 300, height: 300, fit: true }));
     //sharp(res).resize(500, 500).jpeg({quality: 90});
      //readstream.pipe(res);
      readstream.pipe(res)
    
     
   }else{
     res.status(404).json({
       err: 'Not an image'
     })
   }
  });
});


 // app.use(express.static(`${__dirname}/public`));
 //app.use(express.static('client/build'));
 //app.use(express.static(`${__dirname}/images`));

//Serve static asset in production
if(process.env.NODE_ENV === 'production'){
  //Set static folder
 app.use(express.static(`${__dirname}/client/build`));
/*  app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public'))
 }); */
 
  app.get('*', (req, res) => {
          
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    }) 
}; 

//app.use(express.static(`${__dirname}/images`));
//app.use(express.static(`public`));

app.all('*', (req, res, next) =>{
   next(new AppError(`Can't find ${req.originalUrl} on this server `, 404));
});//for all http method, for unndefined routes



app.use(globalErrorHandler);


module.exports = app;
