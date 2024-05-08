const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        // Adding regex pattern for email validation
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isVerify: { type: Boolean, default:false }
});


const user = mongoose.model('User',userSchema)

module.exports = user

