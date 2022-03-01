const mongoose = require('mongoose');
const dotenv = require('dotenv');



process.on('uncaughtException', err =>{
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});//Listinng to  UNCAUGHT EXCEPTION....

dotenv.config({ path: './config.env' }); //This will read this file and then save the varaiable in the enveroment variable

const app = require('./app');

const DB = process.env.DATASBASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);



mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() =>{
   /*  console.log('BD connection successful'); */
});//The option for the decraptionss




//console.log(app.get('env'));
//We start the server
const port = process.env.PORT || 8000;



const server = app.listen(port, () => {
  /* console.log(`App runing on port ${port}...`); */
});


process.on('unhandledRejection', err =>{
  
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() =>{
    process.exit(1);
  });
  
});



