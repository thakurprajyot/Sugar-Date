const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const blackbox = require('./blackbox');

// Route to validate user credentials and generate JWT token
router.post('/login', async (req, res) => {
 try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Blackbox AI for enhanced authentication
    const risk = await blackbox.evaluateUser(user);
    if (risk > 0.7) {
      return res.status(403).json({ error: 'High risk user' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
 }
});

// Route to handle forgotten password scenarios
router.post('/forgot-password', async (req, res) => {
 try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Implement password reset logic here
    res.json({ message: 'Password reset email sent' });
 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
 }
});

module.exports = router;
