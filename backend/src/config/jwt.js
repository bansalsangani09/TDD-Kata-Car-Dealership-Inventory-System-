/**
 * JWT configuration.
 * Values are read lazily from process.env at call time so that test setup
 * (which sets JWT_SECRET after module load) is always respected.
 */
const getJwtConfig = () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || "7d",
});

module.exports = getJwtConfig;
