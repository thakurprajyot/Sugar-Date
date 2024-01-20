const express = require('express');
const router = express.Router();
const User = require('../models/User');
const anonymizeUserData = require('../utils/anonymize');

router.get('/:userId/data', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId, '-password');

    // Optionally anonymize user data before sending
    const anonymizedUser = anonymizeUserData(user);

    res.json(anonymizedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
