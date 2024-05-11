const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { Register, VerifyOtp, Login, TokenVerification, Logout, ResendOtp } = require('node-easy-auth');

const app = express();

app.use(cookieParser());
app.use(express.json());
require('dotenv').config()

// Connect to MongoDB
const dbtoken = process.env.MONGODBURL;
mongoose.connect(dbtoken).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.post('/register', (req, res) => {
    Register(req, res)
      .then((user) => {
        res.json({ message: 'User registered successfully', user });
      })
      .catch((err) => {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Registration failed' });
      });
  });



  app.post('/verify-otp',(req,res)=>{
    VerifyOtp(req,res).then((e)=>{
        res.json({otp:e})
        }).catch((err)=>{
        res.json({otp:err})
    })
  })




  app.get('/resendotp', (req, res) => {

    ResendOtp(req,res).then(()=>{
      res.json({ status:true,msg: 'otp sent' });
    }).catch((err)=>{
      res.json({ status:true,msg: `otp sent${err}` });
    })
  
    
  });






  app.post('/login', (req, res) => {
    Login(req, res)
      .then((user) => {
        res.json({ message: 'Login successful', user });
      })
      .catch((err) => {
        console.error('Login error:', err);
        res.status(401).json({ error: 'Login failed' });
      });
  });






  app.get('/protected-route', TokenVerification, (req, res) => {
    // Access user data from decoded token in req.user
    res.json({ message: 'Protected route accessed successfully', user: req.user });
  });

app.get('/logout', Logout, (req, res) => {
  res.json({ message: 'User logged out successfully' });
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

