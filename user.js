const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // ... other fields
  consent: {
    type: Boolean,
    required: true,
    default: false,
  },
  consentTimestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
