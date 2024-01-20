const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.put('/:userId/privacy', async (req, res) => {
  try {
    const { userId } = req.params;
    const { profileFields } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { profileFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
