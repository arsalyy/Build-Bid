const mongoose = require('mongoose')

const projectsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  builder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote' },
  bid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }
})

const Project = mongoose.model('Projects', projectsSchema)

exports.Project = Project
