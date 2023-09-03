const mongoose = require('mongoose')

const bidsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote' },
  amount: Number
})

const Bid = mongoose.model('Bid', bidsSchema)

exports.Bid = Bid
