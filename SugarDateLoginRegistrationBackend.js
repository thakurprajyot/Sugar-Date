const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const blackbox = require('./blackbox');

// Route to handle user registration
router.post('/register', async (req, res) => {
 try {
    const { username, email, password, gender, dob } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Blackbox AI for additional verification or fraud detection
    const risk = await blackbox.evaluateRegistration({ username, email, gender, dob });
    if (risk > 0.7) {
      return res.status(403).json({ error: 'High risk user' });
    }

    // Implement email or mobile number verification logic here
    const verificationCode = await blackbox.generateVerificationCode();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({ username, email, password: hashedPassword, gender, dob, verificationCode });
    await newUser.save();

    res.json({ message: 'User registered successfully' });
 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
 }
});

// Route to handle user verification after registration
router.post('/verify', async (req, res) => {
 try {
    const { verificationCode } = req.body;
    const user = await User.findOne({ verificationCode });

    if (!user) {
      return res.status(
