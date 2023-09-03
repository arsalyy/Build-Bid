const express = require('express')
const router = express.Router()
const { awardProject, myProjects } = require('../controllers/projectController')

router.post('/project/awardProject', awardProject)
router.post('/project/myProjects', myProjects)

module.exports = router
