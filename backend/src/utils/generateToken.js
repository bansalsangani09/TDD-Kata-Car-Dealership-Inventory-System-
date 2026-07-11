const jwt = require("jsonwebtoken");
const getJwtConfig = require("../config/jwt");

/**
 * Generates a signed JWT for the given user ID.
 * Config is read lazily so test env vars (set in beforeAll) are always picked up.
 *
 * @param {string} userId - MongoDB ObjectId as a string
 * @returns {string} Signed JWT token
 */
const generateToken = (userOrId) => {
  const { secret, expiresIn } = getJwtConfig();
  if (userOrId && typeof userOrId === "object") {
    return jwt.sign(
      {
        id: userOrId.id || userOrId._id,
        email: userOrId.email,
        role: userOrId.role,
      },
      secret,
      { expiresIn }
    );
  }
  return jwt.sign({ id: userOrId }, secret, { expiresIn });
};

module.exports = generateToken;
