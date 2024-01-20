// ...

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
