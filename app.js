const express = require('express');

const app = express();
const morgan = require('morgan');

const profileRouter = require('./routes/profileRoute');
const userRouter = require('./routes/userRoute');

//Mddleware
if (process.env.NODE_ENV === ' development ') {
  app.use(morgan('dev')); //3de middle were
}
app.use(express.json()); //will put the data coming from body in req object(parse the data from the body)

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from middleware 👋🏽 ');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//////END MIDDLEWARE
//Mounting new router in the route
app.use('/api/v1/profiles', profileRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
