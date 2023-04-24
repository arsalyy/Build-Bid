const { User } = require('../model/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

router.post('/users/login', async (req, res) => {
  const users = await User.find()
  const foundUser = users.find((user) => user.email === req.body.email)
  if (!foundUser) {
    res.status(404).send({
      status: 404,
      data: {},
      message: 'User not found'
    })
  } else {
    const match = await bcrypt.compare(req.body.password, foundUser.password)
    if (!match) {
      res.status(401).send({
        status: 401,
        data: {},
        message: 'Incorrect password'
      })
    } else {
      res.send({
        status: 200,
        data: {
          id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          type: foundUser.type
        },
        message: 'User found'
      })
    }
  }
})

router.post('/users/signup', async (req, res) => {
  try {
    const { name, email, password, type } = req.body
    const users = await User.find()
    const foundUser = users.find((user) => user.email === email)
    if (foundUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({ name, email, password: hashedPassword, type })
    const result = await newUser.save()

    return res.status(201).send({
      status: 200,
      data: {
        id: result._id,
        name: result.name,
        email: result.email,
        type: result.type
      },
      message: 'User Created'
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Server error')
  }
})

module.exports = router
