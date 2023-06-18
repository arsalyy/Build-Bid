const mongoose = require('mongoose')

const pricesSchema = new mongoose.Schema({
  bricks: {
    perMarla: Number,
    options: {
      gradeA: Number,
      gradeB: Number,
      gradeC: Number
    },
    unit: String
  },
  cement: {
    perMarla: Number,
    options: {
      lucky: Number,
      dg: Number,
      mapleLeaf: Number
    },
    unit: String
  },
  sand: {
    perMarla: Number,
    options: {
      ravi: Number,
      chenab: Number
    },
    unit: String
  },
  crush: {
    perMarla: Number,
    options: {
      margala: Number,
      sarghoda: Number
    },
    unit: String
  },
  roofInsulation: {
    perMarla: Number,
    price: Number,
    unit: String
  },
  termiteProofing: {
    perMarla: Number,
    price: Number,
    unit: String
  },
  waterProofing: {
    perMarla: Number,
    price: Number,
    unit: String
  },
  labor: {
    costPerMarla: Number
  },
  excavationAndBackFill: {
    perMarla: Number,
    price: Number,
    unit: String
  },
  steel: {
    price: Number
  },
  plumbing: {
    laborCost: Number,
    hotAndColdWaterSupply: Number,
    drainageSystem: Number,
    gasPiping: Number,
    pvcPipes: Number,
    acDrain: Number,
    armaflexInsulation: Number
  },
  electric: {
    switches: Number,
    accessories: Number,
    laborCost: Number
  }
})

const Price = mongoose.model('Price', pricesSchema)

exports.Price = Price
