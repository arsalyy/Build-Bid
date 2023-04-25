const express = require('express')
const router = express.Router()
const { login, signup, sendOTP, verifyOTP } = require('../controllers/userController')

router.post('/users/login', login)
router.post('/users/signup', signup)
router.post('/users/sendOTP', sendOTP)
router.post('/users/verifyOTP', verifyOTP)

module.exports = router
