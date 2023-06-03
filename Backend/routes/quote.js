const express = require('express')
const router = express.Router()
const { create, getAllQuotes } = require('../controllers/quoteController')

router.post('/quote/create', create)
router.post('/quote/findMany', getAllQuotes)

module.exports = router
