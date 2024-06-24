const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signin = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.error('Signin successfully');

        res.status(200).json({ token, role });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to validate the username
function isValidUsername(username) {
    const lowercaseRegex = /^[a-z]+$/;
    return lowercaseRegex.test(username);
}

// Function to validate the password
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
}

// Function to validate the email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const signup = async (req, res) => {
    const { username, password, email, role } = req.body;

    try {
        if (!isValidUsername(username)) {
            return res.status(400).json({ error: 'Username must contain only lowercase letters' });
        }
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ error: 'User already registered' });
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({ error: 'Password must contain at least one capital letter, one lowercase letter, one special character, and a minimum of 8 characters' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ error: 'User already registered' });
        }

        if (role === '1') {
            const existingAdmin = await User.findOne({ role: 1 });
            if (existingAdmin) {
                return res.status(400).json({ error: 'Admin user already exists. You cannot register as an admin.' });
            }
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10); // Ensure to provide salt rounds (e.g., 10)

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            role: role !== undefined ? role : 0
        });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    signin,
    signup
}