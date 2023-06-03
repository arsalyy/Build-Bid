const { Quote } = require('../models/quote')

const create = async (req, res) => {
  const { user, price } = req.body
  const newUser = new Quote({ user: user, price: price })
  try {
    await newUser.save()
    return res.status(200).send({
      message: 'Quote Created'
    })
  } catch (e) {
    return res.status(500).send({
      message: e
    })
  }
}

const getAllQuotes = async (req, res) => {
  const result = await Quote.find()
  return res.status(200).send({
    quotes: result
  })
}

module.exports = {
  create,
  getAllQuotes
}
