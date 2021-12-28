const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); //This will read this file and then save the varaiable in the enveroment variable

const DB = process.env.DATASBASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('BD connection successful');
});//The option for the decraptionss

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Profile must have a name'],
    unique: true,
 },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  phone:{
      type: Number
  },
  company: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  rating:{
      type: Number,
      default: 4.5
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Profile = mongoose.model('Profile', profileSchema);

const testProfile = new Profile({
    name: "doska",
    phone: '0644992589',
    company: 'TOYOTA',
    location: 'madrid',
    status: 'developer',
    
});

testProfile
.save()
.then( doc => {
    console.log(doc);
})
.catch( (err) =>{  
    console.log("Error 💥 : ", err);
});

const app = require('./app')

//console.log(app.get('env'));
//We start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
