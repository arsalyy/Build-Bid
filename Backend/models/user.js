const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  type: String,
  verified: Boolean,
  identityVerified: Boolean,
  file: String,
  waiting: Boolean
})

const User = mongoose.model('User', usersSchema)

exports.User = User
