
const user = require("./modal/user"); // Assuming user model is imported from 'modal/user'
const jwt = require("jsonwebtoken");

// Function to generate a 4-digit OTP
const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000); // Generates OTP between 1000 and 9999
  return otp.toString(); // Convert OTP to string
};

// Register function to handle user registration
const Register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user with given email already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return { msg: `Email already exists: ${email}` };
    }

    // Create a new user instance
    const newUser = new user({
      username,
      email,
      password,
    });

    // Set expiration time for OTP (120 seconds from current timestamp)
    const expirationTime = Math.floor(Date.now() / 1000) + 120;

    // Generate OTP and create a JWT token with OTP and expiration time
    const otp = generateOTP();
    const token = jwt.sign(
      { otp, exp: expirationTime },
      "dvrdv"
    );

    // Set OTP token as a cookie
    res.cookie("otp", token);

    // Save the new user to the database
    await newUser.save();

    return { msg: `User added successfully` };
  } catch (error) {
    return { msg: `Some error occurred: ${error}` };
  }
};

// Function to verify the OTP
const verifyOtp = (req, res) => {
  // Retrieve OTP token from cookie and OTP value from request body
  const token = req.cookies.otp;
  const { otp } = req.body;

  try {
    // Decode the token to extract OTP and expiration time
    const decoded = jwt.verify(token, "dvrdv");

    // Compare the OTP from the request with the decoded OTP
    if (otp === decoded.otp) {
      console.log("Verified"); // OTP is correct
    } else {
      console.log("Incorrect OTP"); // OTP is incorrect
    }

    console.log(decoded.otp); // Log the decoded OTP
  } catch (error) {
    console.log(`Error verifying OTP: ${error}`); // Log error if verification fails
  }
};

// Export Register and verifyOtp functions
module.exports = { Register, verifyOtp };
