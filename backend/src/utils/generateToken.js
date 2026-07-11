const jwt = require("jsonwebtoken");
const getJwtConfig = require("../config/jwt");

/**
 * Generates a signed JWT for the given user ID.
 * Config is read lazily so test env vars (set in beforeAll) are always picked up.
 *
 * @param {string} userId - MongoDB ObjectId as a string
 * @returns {string} Signed JWT token
 */
const generateToken = (userId) => {
  const { secret, expiresIn } = getJwtConfig();
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

module.exports = generateToken;
