const express = require('express');

const app = express();
const morgan = require('morgan');

const profileRouter = require('./routes/profileRoute');
const userRouter = require('./routes/userRoute');

//Mddleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //3de middle were
 
}
app.use(express.json()); //will put the data coming from body in req object(parse the data from the body)

app.use(express.static(`${__dirname}/public`));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//////END MIDDLEWARE
//Mounting new router in the route
app.use('/api/v1/profiles', profileRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) =>{
  /*  res.status(404).json({
     status: 'fail',
     message: `Can't find ${req.originalUrl} on this server `
   }) */

   const err = new Error(`Can't find ${req.originalUrl} on this server `);
   err.status = 'fail';
   err.statusCode = 404;
   next(err);
});//for all http method, for unndefined routes


app.use((err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
});
module.exports = app;
