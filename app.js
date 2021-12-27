const fs = require('fs');
const express = require('express');
const { profile } = require('console');
const app = express();
const morgan = require('morgan');


const profiles =JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`)) ;


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


//Routes handler
const getAllProiles = (req, res) =>{
    console.log(req.requestTime);
    res.status(200).json({
        status:"success",
        results: profiles.length,
        data:{
            profiles
        }
    });
}

const getProfile = (req, res) =>{
    const id = req.params.id;
    const profile = profiles.find(el =>el._id === id );
    //if(id > profiles.length){
    if(!profile){
        return res.status(404).json({
            status: "fail",
            message:"Invalid id"
        })
    }
    res.status(200).json({
        status:"success",
        data:{
            profile
        } 
    });
}; 

const createProfile = (req, res)=>{
    console.log(req.body);
    const newId = profiles[profiles.length - 1 ]._id + 1;
    const newProfile = Object.assign({_id: newId}, req.body);
    profiles.push(newProfile);
    fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(profiles), err =>{
             res.status(201).json({
                 status: "success",
                 data:{
                     profile: newProfile
                 }
             })
    });
    
}

const updateProfile =  (req, res) =>{
    const id = req.params.id;
       if( id> profiles.length){
            return res.status(404).json({
                status: "fail",
                message:"Invalid id"
            })
        }
        res.status(204).json({
            status:"success",
            data:{
                profile: 'Update this proile'
            }
             
            
        })
};

const deletProfile = (req, res) =>{
    const id = req.params.id;
       if( id> profiles.length){
            return res.status(404).json({
                status: "fail",
                message:"Invalid id"
            })
        }
        res.status(204).json({
            status:"success",
            data:
                null
            
        })
}


//USERS
const getAllUsers = (req, res) =>{
    res.status(500).json({
        status:"error",
        message:'This route is not yet defined'
    });
};

const createUser = (req, res) =>{
    res.status(500).json({
        status:"error",
        message: "This route is not yet defined"
    });
}; 

const getUser = (req, res) =>{
    res.status(200).json({
        status:"error",
        message: "This route is not yet defined"
    });
}; 

const updateUser = (req, res) =>{
    res.status(200).json({
        status:"error",
        message: "This route is not yet defined"
    });
}; 

const deleteUser = (req, res) =>{
    res.status(500).json({
        status:"error",
        message: "This route is not yet defined"
    });
}; 


//Routes
const profileRouter = express.Router();
const userRouter =  express.Router();

//Mounting new router in the route
app.use('/api/v1/profiles', profileRouter);
app.use('/api/v1/users', userRouter);
///</>


profileRouter.route('/')
    .get(getAllProiles)
    .post(createProfile);

profileRouter.route('/:id')
    .get(getProfile)
    .patch(updateProfile)
    .delete(deletProfile);


userRouter.route('/')
   .get(getAllUsers)
   .post(createUser);

userRouter.route('/:id')
   .get(getUser)
   .patch(updateUser)
   .delete(deleteUser)

//We start the server    
const port = 8000;
app.listen(port,() => {
    console.log(`App runing on port ${port}...`);
} );