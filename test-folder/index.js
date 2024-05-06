const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express()

const {Register,verifyOtp} = require('easy-auth1234599')


app.use(cookieParser())
app.use(express.json())


const dbtoken = 'mongodb://localhost:27017/testdb'
mongoose.connect(dbtoken).then(()=>{
  console.log('Db connected')
}).catch((err)=>{
  console.log(err)
})



app.get('/',(req,res)=>{

Register(res,req).then((e)=>{
  console.log(e)
  res.json({msg:'ok'})
}).catch((err)=>{
  console.log(err)
})

})


app.get('/otp',(req,res)=>{
  verifyOtp(res,req)
  res.json({otp:'otp'})
})



app.listen(3000,()=>{
  console.log('server is running on port no 3000')
})