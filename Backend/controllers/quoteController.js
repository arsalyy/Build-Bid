const { Quote } = require('../models/quote')
const { Bid } = require('../models/bid')
const { Project } = require('../models/project')
const { generateQuote } = require('../helpers')

const create = async (req, res) => {
  const { user, area, areaInMarla, floorPlan, generalQuestions, securityQuestions } = req.body
  const quote = await generateQuote(areaInMarla, generalQuestions, securityQuestions)

  try {
    const newQuote = new Quote({
      user: user,
      quote: quote,
      area: area,
      areaInMarla: areaInMarla,
      floorPlan: floorPlan,
      generalQuestions: generalQuestions,
      securityQuestions: securityQuestions
    })

    return res.status(200).send({
      message: 'Quote Created',
      body: newQuote
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

const myQuotes = async (req, res) => {
  const { user } = req.body

  try {
    const projectQuotes = await Project.distinct('quote')

    const result = await Quote.find({ user: user, _id: { $nin: projectQuotes } })

    if (!result || result.length <= 0)
      return res.status(404).send({
        quotes: []
      })

    const parsedQuotes = await Promise.all(
      result.map(async (quote) => {
        const bid = await Bid.find({ quote: quote.id }).populate('user')

        bid.sort((a, b) => b.amount - a.amount)

        return {
          ...quote._doc,
          bids: [...bid]
        }
      })
    )

    return res.status(200).send({
      quotes: parsedQuotes
    })
  } catch (e) {
    return res.status(500).send({
      message: e
    })
  }
}

const post = async (req, res) => {
  try {
    const newQuote = new Quote({
      ...req.body
    })

    await newQuote.save()

    return res.status(200).send({
      message: 'Quote Created',
      body: newQuote
    })
  } catch (e) {
    return res.status(500).send({
      message: e
    })
  }
}

module.exports = {
  create,
  getAllQuotes,
  myQuotes,
  post
}
