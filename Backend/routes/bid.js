const express = require('express')
const router = express.Router()
const { postBid, myBids, highestBid, quoteBids } = require('../controllers/bidController')

router.post('/bid/postBid', postBid)
router.post('/bid/myBids', myBids)
router.post('/bid/highestBid', highestBid)
router.post('/bid/quoteBids', quoteBids)

module.exports = router
