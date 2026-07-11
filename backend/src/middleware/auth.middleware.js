/**
 * Auth Middleware
 * TODO: Implement JWT token verification
 * - Verify Authorization header
 * - Decode and validate JWT
 * - Attach user to req.user
 */

const authMiddleware = (req, res, next) => {
  // TODO: Implement authentication check
  next();
};

module.exports = authMiddleware;
