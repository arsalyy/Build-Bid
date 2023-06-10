const express = require('express')
const router = express.Router()
const { create, getAllQuotes, myQuotes } = require('../controllers/quoteController')

router.post('/quote/create', create)
router.post('/quote/findMany', getAllQuotes)
router.post('/quote/myQuotes', myQuotes)

module.exports = router
