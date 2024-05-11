const generateOTP = require('./generateOtp')
const jwt = require('jsonwebtoken')
const User = require('./modal/user')
const sendMail = require('./Nodemailer')
require('dotenv').config()
const ResendOtp = async (req, res) => {
  const Usertoken = req.cookies.usertoken

  const decode = jwt.verify(Usertoken, process.env.secretKey)

  const expirationTime = Math.floor(Date.now() / 1000) + 120
  const otp = generateOTP()
  const {
    email,
    username: username,
    _id,
  } = await User.findOne({ _id: decode.id })

  sendMail(email, username, otp)
  const token = jwt.sign(
    { otp, id: _id, exp: expirationTime },
    process.env.secretKey,
  )

  res.cookie('otp', token)
}

module.exports = ResendOtp
