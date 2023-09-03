const express = require('express')
const router = express.Router()
const { login, getPendingBuilders, verifyBuilder } = require('../controllers/adminController')

router.post('/admin/login', login)
router.post('/admin/getPendingBuilders', getPendingBuilders)
router.post('/admin/verifyBuilder', verifyBuilder)

module.exports = router
