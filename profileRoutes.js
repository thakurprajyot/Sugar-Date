const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.put('/:userId/consent', async (req, res) => {
  try {
    const { userId } = req.params;
    const { consent } = req.body;

    const user = await User.findByIdAndUpdate(userId, { consent }, { new: true });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
