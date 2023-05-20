const { ADMIN_PASSWORD } = require('../env')
const { User } = require('../models/user')

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

  const user = await User.findOne({
    email: email
  })

  user.identityVerfied = true
  user.waiting = false
  await user.save()

  return res.status(200).send({
    message: 'Builder Verified'
  })
}

module.exports = {
  login,
  getPendingBuilders,
  verifyBuilder
}
