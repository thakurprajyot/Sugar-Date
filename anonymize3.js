const crypto = require('crypto');

const anonymizeUserData = (user) => {
  const anonymizedUser = user.toObject();

  // Anonymize or pseudonymize specific fields
  anonymizedUser.displayName = 'Anonymous';
  anonymizedUser.email = crypto.randomBytes(10).toString('hex') + '@example.com';
  anonymizedUser.profilePicture = null;

  return anonymizedUser;
};

module.exports = anonymizeUserData;
