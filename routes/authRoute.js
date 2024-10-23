const express = require('express')
const { SignUp } = require('../controller/authController')

const router  = express.Router()

router.post('/sinup',SignUp)

module.exports = router