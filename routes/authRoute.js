const express = require('express')
const { SignUp, SignIn } = require('../controller/authController')

const router  = express.Router()

router.post('/sinup/',SignUp)
router.post('/login/',SignIn)

module.exports = router