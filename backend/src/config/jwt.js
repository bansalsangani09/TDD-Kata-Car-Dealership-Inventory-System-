/**
 * JWT configuration loaded from environment variables.
 * Replace placeholder values in .env before use.
 */
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

module.exports = jwtConfig;
