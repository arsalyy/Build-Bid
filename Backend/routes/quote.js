const express = require('express')
const router = express.Router()
const { create, getAllQuotes, myQuotes, post } = require('../controllers/quoteController')

router.post('/quote/create', create)
router.post('/quote/post', post)
router.post('/quote/findMany', getAllQuotes)
router.post('/quote/myQuotes', myQuotes)

module.exports = router
