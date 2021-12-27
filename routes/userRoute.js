const express = require('express');
const router = express.Router();
const userControler = require('../controlers/userControler')

router.route('/')
   .get(userControler.getAllUsers)
   .post(userControler.createUser);

router.route('/:id')
   .get(userControler.getUser)
   .patch(userControler.updateUser)
   .delete(userControler.deleteUser)



module.exports = router;