const fs = require('fs');
const express = require('express');
const { profile } = require('console');
const app = express();

app.use(express.json());//will put the data coming from body in req object
const profiles =JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`)) ;


//Mddleware
app.use((req, res, next) =>{
    console.log('Hello from middleware 👋🏾');
    next();
});
app.use((req, res, next) =>{
    req.requestTime = new Date().toISOString();
    next();
});
//////END MIDDLEWARE

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


/* app.get('/api/v1/profiles', getAllProiles );
app.post('/api/v1/profiles', createProfile );
app.get('/api/v1/profile/:id', getProfile );
app.patch('/api/v1/profiles/:id', updateProfile );
app.delete('/api/v1/profiles/:id' ,deletProfile ); */

app.route('/api/v1/profiles')
    .get(getAllProiles)
    .post(createProfile);

 app.route('/api/v1/profiles/:id')
    .get(getProfile)
    .patch(updateProfile)
    .delete(deletProfile);

const port = 8000;
app.listen(port,() => {
    console.log(`App runing on port ${port}...`);
} );