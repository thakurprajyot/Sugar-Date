const User = require('../models/User');

exports.updateSettings = async (req, res) => {
  try {
    const { userId } = req.body;
    const { username, email, password, privacy, notifications } = req.body;

    // Update user settings in the database
    const user = await User.findByIdAndUpdate(userId, { username, email, password, privacy, notifications }, { new: true });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
