require('dotenv').config()
const nodemailer = require('nodemailer')
const sendAuthmail = async (email, name, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  })

  const moreOption = {
    from: 'Easy Auth',
    to: email,
    subject: 'Email Verification',
    html: `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
            }
            .header {
              background-color: #007bff;
              color: #fff;
              padding: 20px;
              text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .content {
              padding: 20px;
              text-align: center;
            }
            .otp {
              font-size: 24px;
                font-weight: bold;
                color: #007bff;
            }
            .footer {
              text-align: center;
              padding-top: 20px;
                color: #666666;
            }
            .footer-content {
                background-color: #f7f7f7;
                padding: 10px;
                border-radius: 0 0 8px 8px;
            }
            .footer-content p {
                margin: 5px 0;
            }
            .bold{
                  font-size: 19px;
    font-weight: bolder;
    color: #25013c;
            }
            </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
            <h2>Email Verification</h2>
            </div>
            <div class="content">
            <p class="bold">Hello,${name}</p>
                <p>Your OTP for email verification is: <span class="otp">${otp}</span></p>
                <p>Please use this OTP to verify your email address.</p>
                <img src="https://supertokens.com/covers/email_verification_blog_banner.png" alt="Verification Image" style="max-width: 100%; height: auto;">
            </div>
            <div class="footer">
                <div class="footer-content">
                    <p>Thank you for using our service,</p>
                    <p>Made with 💖 by Jyzib zaidi</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `,
  }

  // view engine: ejs

  try {
    await transporter.sendMail(moreOption)
  } catch (error) {
    console.log(error)
  }
  console.log(otp)
}

module.exports = sendAuthmail
