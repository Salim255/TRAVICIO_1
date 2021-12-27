const express = require('express');
const { profile } = require('console');
const app = express();
const morgan = require('morgan');

const profileRouter = require('./routes/profileRoute');
const userRouter = require('./routes/userRoute');

//Mddleware
app.use(express.json());//will put the data coming from body in req object(parse the data from the body)
app.use(morgan('dev'));//3de middle were

app.use((req, res, next) =>{
    console.log('Hello from middleware 👋🏾');
    next();
});
app.use((req, res, next) =>{
    req.requestTime = new Date().toISOString();
    next();
});

//////END MIDDLEWARE
//Mounting new router in the route
app.use('/api/v1/profiles', profileRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;