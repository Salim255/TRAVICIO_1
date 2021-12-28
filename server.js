const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });//This will read this file and then save the varaiable in the enveroment variable

const app = require('./app');

//console.log(app.get('env'));
//We start the server    
const port = process.env.PORT || 8000;
app.listen(port,() => {
    console.log(`App runing on port ${port}...`);
} );

