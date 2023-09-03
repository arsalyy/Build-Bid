const express = require('express')
const router = express.Router()
const { login, signup, sendOTP, verifyOTP, uploadFile, resetPassword } = require('../controllers/userController')
const { upload } = require('../multer')

router.post('/users/login', login)
router.post('/users/signup', signup)
router.post('/users/sendOTP', sendOTP)
router.post('/users/verifyOTP', verifyOTP)
router.post('/users/resetPassword', resetPassword)
router.post('/users/upload', upload.single('file'), uploadFile)

module.exports = router
