const express = require('express');
const path = require('path');

const app = express();
const morgan = require('morgan');
const compression = require('compression');
const globalErrorHandler =  require('./controlers/errorControler');
const AppError = require('./utils/appError');


const profileRouter = require('./routes/profileRoute');
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
const reviewRouter = require('./routes/reviewRoute');


//Mddleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //3de middle were
 
}
app.use(express.json()); //will put the data coming from body in req object(parse the data from the body)

//app.use(express.static(`${__dirname}/public`));



app.use(compression());//will compress all the files send to th eclient

app.use((req, res, next) => {

  req.requestTime = new Date().toISOString();
  
  next();
});

//////END MIDDLEWARE
//Mounting new router in the route
app.use('/api/v1/profiles', profileRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/reviews', reviewRouter);


//Serve static asset in production
if(process.env.NODE_ENV === 'production'){
  //Set static folder
  
 // app.use(express.static(`${__dirname}/public`));
 //app.use(express.static('client/build'));
 app.use(express.static(`${__dirname}/images`));
/*  app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public'))
 }); */
 //app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    /* const lookupPath = req.path;
    if(lookupPath[1] === 'i'){
      //console.log("Hello from public");
      app.use(express.static(`${__dirname}/images`));
      //app.use(express.static(`public`));
    }
   else{
    app.use(express.static('client/build'));
    //app.use(express.static(`public`));
    }   */
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
