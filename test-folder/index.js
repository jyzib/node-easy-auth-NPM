const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express()

const {Register,verifyOtp} = require('easy-auth1234699')


app.use(cookieParser())
app.use(express.json())


const dbtoken = 'mongodb://localhost:27017/testdb'
mongoose.connect(dbtoken).then(()=>{
  console.log('Db connected')
}).catch((err)=>{
  console.log(err)
})



app.get('/register',(req,res)=>{

Register(req,res).then((e)=>{
  console.log(e)
  res.json({msg:'ok'})
}).catch((err)=>{
  console.log(err)
})

})


app.get('/otp',(req,res)=>{
  verifyOtp(req,res)
  res.json({otp:'otp'})
})



app.listen(3000,()=>{
  console.log('server is running on port no 3000')
})