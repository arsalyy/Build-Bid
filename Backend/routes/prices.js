const express = require('express')
const router = express.Router()
const { findMany } = require('../controllers/priceController')

router.post('/prices/findMany', findMany)

module.exports = router
