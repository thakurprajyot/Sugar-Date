const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const settingsController = require('../controllers/settingsController');

router.put('/password', settingsController.updatePassword);
router.put('/two-factor', settingsController.updateTwoFactor);

module.exports = router;
