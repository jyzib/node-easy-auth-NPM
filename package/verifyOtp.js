const user = require('./modal/user') // Assuming user model is imported from 'modal/user'
const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifyOtp = async (req, res) => {
  // Retrieve OTP token from cookie and OTP value from request body
  const token = req.cookies.otp
  const Usertoken = req.cookies.usertoken
  const { otp } = req.body
  console.log(Usertoken)
  try {
    // Decode the token to extract OTP and expiration time
    const decoded = jwt.verify(token, process.env.secretKey)
    const Userdecoded = jwt.verify(Usertoken, process.env.secretKey)

    // Compare the OTP from the request with the decoded OTP
    if (otp === decoded.otp) {
      const result = await user.updateOne(
        { _id: Userdecoded.id },
        { $set: { isVerify: true } },
      )
      // OTP is correct
      res.cookie('otp', '')

      console.log(decoded.otp) // Log the decoded OTP
      return { status: true, msg: 'Otp Verified successfully' }
    } else {
      return { status: false, msg: 'OTP is incorrect' }
    }
  } catch (error) {
    return { status: false, msg: `Error verifying OTP: ${error}` }
  }
}

module.exports = verifyOtp
