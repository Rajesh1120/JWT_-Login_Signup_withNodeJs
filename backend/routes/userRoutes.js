const express =require('express');
const router=express.Router();
const { registerData, loginUserData, homeData } = require('../controllers/userController');
const authenticationUser =require('../config/validationToken')

router.post('/register',registerData)
router.post('/login',loginUserData);
router.get('/home',authenticationUser,homeData)


module.exports=router;