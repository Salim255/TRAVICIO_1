const app = require('./app');

//We start the server    
const port = 8000;
app.listen(port,() => {
    console.log(`App runing on port ${port}...`);
} );

