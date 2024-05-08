const user = require("./modal/user");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Login = async (req, res) => {
  const { password, email } = req.body;
try {
    const isVerify = await user.findOne({ email });

    if (!isVerify) {
      return { status: false, msg: "Email is incorrect" };
    }
  
    if (isVerify.password !== password) {
      return { status: false, msg: "password is incorrect" };
    }

    
    if (isVerify.isVerify) {
        const expirationTime = Math.floor(Date.now() / 1000) + (60 * 30);
        const token = jwt.sign(
            { username:isVerify.username,email, id: isVerify._id, exp: expirationTime },
            process.env.secretKey
          );
          res.cookie("user", token);
      return { status: true, msg: "User login successfully" };
    } else {

      return { status: false, msg: "Please verify your email to proceed" };
    }
} catch (error) {
    return {status:false,msg:`log ${error}`}
}

};

module.exports = Login;
