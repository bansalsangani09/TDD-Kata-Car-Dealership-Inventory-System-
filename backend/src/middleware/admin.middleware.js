/**
 * Admin Middleware
 * TODO: Implement role-based access control
 * - Check req.user.role === 'admin'
 * - Return 403 if not authorized
 */

const adminMiddleware = (req, res, next) => {
  // TODO: Implement admin role check
  next();
};

module.exports = adminMiddleware;
