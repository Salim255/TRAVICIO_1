const AppError = require("../utils/appError");

const handleCastErrorDB = (err)=>{
      const message = `Invalid ${err.path}: ${err.value}` 
      
      return new AppError(message,400);
}

const handleDublicateFieldsDB = (err) =>{
    const value =  err.errmsg.match(/(["'])(.*?[^\\])\1/);

    console.log(value[0]);
    const message = `Dublicate field value: ${value[0]} ,Please use another value`;
    return new AppError(message, 400);
}

const handleValidationErrorDB = (err) =>{
    const errors = Object.values(err.errors).map(el => el.message);//to loop in object we use object.values() in js
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token , Please login again', 401);

const handleJWTExpiredError = () => new AppError('Your token is expired, Please login again', 401);


const sendErrorDev = (err, res) =>{
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
      });
}

const sendErrorProd = (err, res) =>{

    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
          });
    }else{
        //1) log error
        console.log('ERROR 💥', err);

        //2)Send generic error 
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong'
        })
    }
   
}



module.exports = (err, req, res, next) =>{

    //console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err, res);
    }else if(process.env.NODE_ENV === 'production'){
     
     
      if(err.name === 'CastError') {err= handleCastErrorDB(err);}
      
      if(err.code === 11000){
          err = handleDublicateFieldsDB(err);
      }
      if(err.name === 'ValidationError'){
          err = handleValidationErrorDB(err);
      }
      if(err.name === "JsonWebTokenError"){
          err = handleJWTError();
      }
      if(err.name === "TokenExpiredError"){
          err = handleJWTExpiredError()
      }
      sendErrorProd(err, res);
    };
   
}