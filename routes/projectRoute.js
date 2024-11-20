const express = require('express')
const { projectValidtaion } = require('../utils/validations/Validation')
const { authMiddleware } = require('../middleware/authMiddleware')
const { createProject } = require('../controller/projectController')

const router = express.Router()

router.post('/',projectValidtaion,createProject)

module.exports = router;