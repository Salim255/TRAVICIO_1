const AppError = require("../utils/appError");

const handleCastErrorDB = (err)=>{
      const message = `Invalid ${err.path}: ${err.value}` 
      console.log('Hello from here');
      return new AppError(message,400);
}

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

      sendErrorProd(err, res);
    };
   
}