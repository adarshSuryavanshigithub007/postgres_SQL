const express = require('express')
const { SignUp, SignIn } = require('../controller/authController')
const { AuthRegisterValidation, AuthLoginValidation } = require('../utils/validations/authValidation')

const router  = express.Router()

router.post('/sinup/',AuthRegisterValidation, SignUp)
router.post('/login/',AuthLoginValidation,SignIn)

module.exports = router