const mongoose = require('mongoose')
const users = require('./routes/users')
const admin = require('./routes/admin')
const quote = require('./routes/quote')
const bid = require('./routes/bid')
const project = require('./routes/project')
const express = require('express')
var cors = require('cors')
const app = express()

app.use(cors())

mongoose
  .connect('mongodb://localhost/buildbid')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err))

app.use(express.json())
app.use('/api', users)
app.use('/api', admin)
app.use('/api', quote)
app.use('/api', bid)
app.use('/api', project)

const server = app.listen(4000, () => console.log('Listenng on Port 4000...'))

module.exports = server
