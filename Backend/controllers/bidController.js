const { Bid } = require('../models/bid')
const { Quote } = require('../models/quote')

const postBid = async (req, res) => {
  const { quote, amount, user } = req.body
  const newBid = new Bid({ user: user, quote: quote, amount: amount })
  try {
    await newBid.save()
    return res.status(200).send({
      message: 'Bid Posted'
    })
  } catch (e) {
    return res.status(500).send({
      message: e
    })
  }
}

const myBids = async (req, res) => {
  const { user } = req.body

  try {
    const result = await Bid.find({ user: user })

    if (!result || result.length <= 0)
      return res.status(404).send({
        bids: []
      })

    const parsedBids = await Promise.all(
      result.map(async (bid) => {
        const quote = await Quote.findById(bid.quote)

        return {
          ...bid._doc,
          quote: {
            ...quote._doc
          }
        }
      })
    )

    return res.status(200).send({
      bids: parsedBids
    })
  } catch (e) {
    return res.status(500).send({
      message: e
    })
  }
}

const highestBid = async (req, res) => {
  const { quote } = req.body

  try {
    const result = await Bid.find({ quote: quote })

    if (!result || result.length <= 0) return res.status(404)

    result.sort((a, b) => a.amount - b.amount)

    return res.status(200).send({
      amount: result[0].amount
    })
  } catch (e) {
    return res.status(500).send({
      message: e
    })
  }
}

const quoteBids = async (req, res) => {
  const { quote } = req.body

  try {
    const result = await Bid.find({ quote: quote })

    return res.status(200).send({
      bids: result
    })
  } catch (e) {
    return res.status(500).send({
      message: e
    })
  }
}

module.exports = {
  postBid,
  myBids,
  highestBid,
  quoteBids
}
