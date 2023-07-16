const { Price } = require('../models/prices')
const { PRICE_RECORD_ID } = require('../env')

const findMany = async (req, res) => {
  try {
    const price = await Price.findById(PRICE_RECORD_ID)

    return res.status(200).send({
      data: price
    })
  } catch (e) {
    return res.status(500).send({
      message: e
    })
  }
}

module.exports = {
  findMany
}
