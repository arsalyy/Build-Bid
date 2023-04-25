const nodemailer = require('nodemailer')
const speakeasy = require('speakeasy')
const Mailgen = require('mailgen')
const { EMAIL, PASSWORD, SECRET_KEY } = require('../env')
const bcrypt = require('bcrypt')
const { User } = require('../models/user')

const login = async (req, res) => {
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
}

const signup = async (req, res) => {
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
}

function generateOTP() {
  return speakeasy.totp({
    secret: SECRET_KEY,
    encoding: 'base32',
    digits: 4
  })
}

const sendOTP = async (req, res) => {
  const { email } = req.body
  const otp = await generateOTP()

  let config = {
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  }
  let transporter = nodemailer.createTransport(config)

  let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Build-Bid',
      link: 'http://buildbid.co/'
    }
  })

  let response = {
    body: {
      greeting: 'Hello!',
      intro: [`Thank you for choosing Build-Bid. Here is your OTP for verification: <strong>${otp}</strong>`],
      outro: ['Please use this OTP within the next 5 minutes to complete your verification.'],
      signature: 'Best regards,'
    }
  }

  let mail = MailGenerator.generate(response)

  let message = {
    from: EMAIL,
    to: email,
    subject: 'OTP',
    html: mail
  }

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(400).json({ message: 'OTP sent successfully' })
    })
    .catch((error) => {
      return res.status(500).send('Server error', error)
    })
}

const verifyOTP = async (req, res) => {
  const { otp } = req.body
  const verified = await speakeasy.totp.verify({
    secret: SECRET_KEY,
    encoding: 'base32',
    token: otp,
    window: 6,
    digits: 4
  })
  if (verified) {
    return res.status(200).json({ message: 'OTP Verified' })
  } else {
    return res.status(500).json({ message: 'Error' })
  }
}

module.exports = {
  login,
  signup,
  sendOTP,
  verifyOTP
}
