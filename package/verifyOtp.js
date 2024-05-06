
const user = require("./modal/user"); // Assuming user model is imported from 'modal/user'
const jwt = require("jsonwebtoken");

const verifyOtp =async (req, res) => {
    // Retrieve OTP token from cookie and OTP value from request body
    const token = req.cookies.otp;
    const { otp } = req.body;
  
    try {
      // Decode the token to extract OTP and expiration time
      const decoded = jwt.verify(token, "dvrdv");
  console.log(decoded)
      // Compare the OTP from the request with the decoded OTP
      if (otp === decoded.otp) {
        const result = await user.updateOne({ _id: decoded.id }, { $set: { isVerify: true } });
        console.log(result)
        console.log("Verified"); // OTP is correct
      } else {
        console.log("Incorrect OTP"); // OTP is incorrect
      }
  
      console.log(decoded.otp); // Log the decoded OTP
    } catch (error) {
      console.log(`Error verifying OTP: ${error}`); // Log error if verification fails
    }
  };
  
  module.exports = verifyOtp