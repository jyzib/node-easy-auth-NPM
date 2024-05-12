const jwt = require('jsonwebtoken')
require('dotenv').config()
const tokenVerification = async (req, res, next) => {
  try {
    const token = req.cookies.user

    if (!token) {
      return res.status(401).json({ status: false, msg: 'Token not found' })
    }

    const decoded = jwt.verify(token, process.env.secretKey)
    console.log(decoded)

    req.user = decoded

    next()
  } catch (error) {
    console.error('Token verification error:', error)
    return res
      .status(401)
      .json({ status: false, msg: `Token verification failed  ${error}` })
  }
}

module.exports = tokenVerification
