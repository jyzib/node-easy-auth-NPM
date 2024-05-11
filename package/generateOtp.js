// Function to generate a 4-digit OTP
const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000) // Generates OTP between 1000 and 9999
  return otp.toString() // Convert OTP to string
}

module.exports = generateOTP
