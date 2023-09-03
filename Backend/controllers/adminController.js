const { ADMIN_PASSWORD, EMAIL, PASSWORD } = require('../env')
const { User } = require('../models/user')
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

const login = async (req, res) => {
  const { password } = req.body

  if (password === ADMIN_PASSWORD)
    res.status(200).send({
      message: 'Admin Authenticated'
    })
  else
    res.status(401).send({
      message: 'Admin Unauthorized'
    })
}

const getPendingBuilders = async (req, res) => {
  const users = await User.find({
    waiting: true
  })

  if (users.length > 0)
    return res.status(200).send({
      data: users.map((user) => ({ name: user.name, email: user.email, file: user.file })),
      message: 'Successful'
    })
  else
    return res.status(200).send({
      data: [],
      message: 'No Pending Builders'
    })
}

const verifyBuilder = async (req, res) => {
  const { email } = req.body

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
      greeting: 'Yayy! You have been verified.',
      intro: [`Thank you for choosing Build-Bid. We've reviewed your account verification request and approved you.`],
      outro: ['You can use your credentials now to access buildbid as a builder now. Welcome aboard.'],
      signature: 'Best regards'
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
    .then(async () => {
      const user = await User.findOne({
        email: email
      })

      user.identityVerified = true
      user.waiting = false
      await user.save()

      return res.status(200).send({
        message: 'Builder Verified'
      })
    })
    .catch((error) => {
      return res.status(500).send('Server error', error)
    })
}

module.exports = {
  login,
  getPendingBuilders,
  verifyBuilder
}
