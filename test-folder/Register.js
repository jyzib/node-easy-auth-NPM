// userService.js

const User = require('./modal/user');

const Register = async (username, email, password) => {
    try {
        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, message: 'User with this email already exists' };
        }

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password
        });

        // Save the new user to the database
        await newUser.save();
        return { success: true, message: 'User registered successfully' };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, message: 'Failed to register user' };
    }
};


module.exports = { Register };
