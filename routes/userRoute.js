const express = require('express');


const router = express.Router();
const userControler = require('../controlers/userControler');
const authControler = require('../controlers/authControler');


router.post('/signup', authControler.signup);
router.post('/login', authControler.login)
         ;
router.patch('/updateMe', authControler.protect, userControler.uploadUserPhoto, userControler.updateMe);

router.route('/')
   .get(authControler.protect, userControler.getUser)
   


/* router.route('/')
   .get(userControler.getAllUsers)
   .post(userControler.createUser);*/

router.route('/:id')
   .get(userControler.getUser)
   .patch(userControler.updateUser)
   .delete(userControler.deleteUser)



module.exports = router;