const mongoose = require('mongoose')

const quotesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: Number
})

const Quote = mongoose.model('Quote', quotesSchema)

exports.Quote = Quote
