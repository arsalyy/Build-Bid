const mongoose = require('mongoose')

const quotesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quote: {
    price: Number,
    range: {
      min: Number,
      max: Number
    },
    breakdown: [
      {
        name: String,
        label: String,
        cost: Number,
        breakdown: [
          {
            name: String,
            label: String,
            cost: Number,
            perMarla: Number,
            options: {
              gradeA: Number,
              gradeB: Number,
              gradeC: Number,
              lucky: Number,
              dg: Number,
              mapleLeaf: Number,
              ravi: Number,
              chenab: Number,
              margala: Number,
              sarghoda: Number
            },
            unit: String
          }
        ]
      }
    ]
  },
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
    sand: String,
    crush: String,
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
