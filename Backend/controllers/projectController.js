const { Project } = require('../models/project')
const { Quote } = require('../models/quote')
const { User } = require('../models/user')
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const { EMAIL, PASSWORD } = require('../env')

const awardProject = async (req, res) => {
  const { builder, quote, bid } = req.body

  try {
    const userId = (await Quote.findById(quote))?.user
    const builderMailAddress = (await User.findById(builder)).email

    const project = new Project({ bid, quote, builder, user: userId })
    await project.save()

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
        greeting: 'Congratulations!',
        intro: [`Thank you for bidding at Build-Bid. You've been awarded with a new project.`],
        outro: ['Login to your Build-Bid account and access your Dashboard to see full details.'],
        signature: 'Best regards'
      }
    }

    let mail = MailGenerator.generate(response)

    let message = {
      from: EMAIL,
      to: builderMailAddress,
      subject: 'Congrats',
      html: mail
    }

    transporter.sendMail(message)

    return res.status(200).send({
      message: 'Project Awarded'
    })
  } catch (e) {
    return res.status(500).send({
      message: e
    })
  }
}

const myProjects = async (req, res) => {
  const { user, type } = req.body

  try {
    let result

    if (type === 'builder')
      result = await Project.find({ builder: user }).populate('user').populate('bid').populate('quote').populate('builder')
    else result = await Project.find({ user: user }).populate('user').populate('bid').populate('quote').populate('builder')

    if (!result || result.length <= 0)
      return res.status(404).send({
        projects: []
      })

    return res.status(200).send({
      projects: result
    })
  } catch (e) {
    return res.status(500).send({
      message: e
    })
  }
}

module.exports = {
  awardProject,
  myProjects
}
