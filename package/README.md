# node-easy-auth

This npm package provides functionalities for user registration, OTP verification, user login, token verification, and user logout using Express.js and Mongoose for MongoDB integration.

## Installation

We have taken care of installing the following peer dependencies. Just install `node-easy-auth` and you are good to go.
```bash
npm install node-easy-auth
```

- `cookie-parser`
- `express`
- `jsonwebtoken`
- `mongoose`
- `nodemailer`


## Import

import this package to make your node auth easy

```js
const { Register, VerifyOtp ,Login,TokenVerification,Logout,ResendOtp} = require('node-easy-auth');
```
## Usage
Setting Up Express Server
First, import necessary modules and set up your Express server:

```js
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { Register, VerifyOtp, Login, TokenVerification, Logout, ResendOtp } = require('node-easy-auth');

const app = express();

app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
const dbtoken = process.env.MONGODBURL;
mongoose.connect(dbtoken).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


```
## Registering a New User
Use the /register endpoint with a POST request to register a new user:
```js
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
```
## Send user info like this in body : 

```bash
{
  "username":"xyz",
  "email":"xyz@gmail.com",
  "password":"xyz@123"
}
```

## Verifying OTP
Verify OTP (one-time password) for user authentication with a POST request to /verify-otp:
```js
app.post('/verify-otp',(req,res)=>{
  VerifyOtp(req,res).then((e)=>{
      res.json({otp:e})
      }).catch((err)=>{
      res.json({otp:err})
  })
})
```
## Send User's OTP like this in body :

```bash
{
  "otp":"2443",
}
```

## Re-Send OTP
Verify OTP (one-time password) for user authentication with a POST request to /verify-otp:
```js

app.get('/resendotp', (req, res) => {

  ResendOtp(req,res).then(()=>{
    res.json({ status:true,msg: 'otp sent' });
  }).catch((err)=>{
    res.json({ status:true,msg: `otp sent${err}` });
  })

  
});
```

## User Login
Authenticate a user by sending a POST request to /login:

```js
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
```

## Send user info like this in body : 

```bash
{
  "email":"xyz@gmail.com",
  "password":"xyz@123"
}
```

## Protected Routes with Token Verification
Access protected routes by sending a GET request to /protected-route. This route requires token verification using the tokenVerification middleware:

```js
app.get('/protected-route', tokenVerification, (req, res) => {
  // Access user data from decoded token in req.user
  res.json({ message: 'Protected route accessed successfully', user: req.user });
});
```

## User Logout
Log out a user by sending a GET request to /logout:

```js
app.get('/logout', Logout, (req, res) => {
  res.json({ message: 'User logged out successfully' });
});
```
## .env
Add these variable in your environment file

```js
EMAILPASSWORD=your-gmail-sskey
EMAIL=your-email-from-which-you-want-to-send-mail
SECRECTKEY=json-web-token-secrect-key
MONGODBURL =your-mongodb-url
```