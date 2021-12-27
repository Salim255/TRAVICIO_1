const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());//will put the data coming from body in req object
const profiles =JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`)) ;

app.get('/api/v1/profiles', (req, res) =>{
    res.status(200).json({
        status:"success",
        results: profiles.length,
        data:{
            profiles
        }
    });
});

app.get('/api/v1/profile/:id', (req, res) =>{
   
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
});

app.post('/api/v1/profiles', (req, res)=>{
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
       
})



const port = 8000;
app.listen(port,() => {
    console.log(`App runing on port ${port}...`);
} );