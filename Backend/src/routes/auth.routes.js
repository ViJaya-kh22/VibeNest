const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const {userValidation} = require('../validations/user.validation')
const {loginValidation} = require('../validations/login.validation')


router.post('/register', userValidation, authController.registerUser);

router.post('/login' , loginValidation, authController.loginUser);




module.exports = router;