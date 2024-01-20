// ...
const auth = require('../middlewares/auth');

router.get('/:userId/profile', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ...
