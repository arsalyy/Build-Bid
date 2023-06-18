const mongoose = require('mongoose')

const quotesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: Number,
  area: Number,
  areaInMarla: Number,
  floorPlan: {
    bedroom: Number,
    bathroom: Number,
    livingRoom: Number,
    kitchen: Number,
    drawingRoom: Number,
    carParkingSpace: Number
  },
  generalQuestions: {
    storey: String,
    brick: String,
    cement: String,
    plumbing: String,
    electric: String
  },
  securityQuestions: {
    considerationsOrChallenges: String,
    permitsOrApprovals: String,
    restrictionsOrRegulations: String
  }
})

const Quote = mongoose.model('Quote', quotesSchema)

exports.Quote = Quote
