// ...

router.get('/:userId/data', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId, '-password');

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:userId/data', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);

    res.json({ message: 'User data deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ...
