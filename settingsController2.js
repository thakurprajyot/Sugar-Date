const User = require('../models/User');

exports.updatePassword = async (req, res) => {
  try {
    const { userId } = req.body;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    // Validate current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid current password' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password in the database
    user.password = hashedPassword;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTwoFactor = async (req, res) => {
  try {
    const { userId } = req.body;
    const { twoFactor } = req.body;

    // Enable/disable two-factor authentication in the database
    const user = await User.findByIdAndUpdate(userId, { twoFactor }, { new: true });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
