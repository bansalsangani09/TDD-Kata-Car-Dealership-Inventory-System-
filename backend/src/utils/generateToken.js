const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

/**
 * Generates a signed JWT token for the given user ID.
 * @param {string} userId - The user's MongoDB ObjectId as string
 * @returns {string} Signed JWT
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

module.exports = generateToken;
