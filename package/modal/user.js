// userModel.js

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isVerify: { type: Boolean, default:false }
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model to use it in other parts of the application
module.exports = User;
