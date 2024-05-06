const generateOTP = require("./generateOtp");
const user = require("./modal/user"); 
const jwt = require("jsonwebtoken");
const sendAuthmail = require("./Nodemailer");

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
    console.log(newUser);
    // Generate OTP and create a JWT token with OTP and expiration time
    const otp = generateOTP();
    console.log(otp);
    const token = jwt.sign(
      { otp, id: newUser._id, exp: expirationTime },
      "dvrdv"
    );

    // Set OTP token as a cookie
    res.cookie("otp", token);
    //send otp via mail
    sendAuthmail(email, username, otp);
    // Save the new user to the database
    await newUser.save();

    return { msg: `User added successfully` };
  } catch (error) {
    return { msg: `Some error occurred: ${error}` };
  }
};

module.exports = Register;
