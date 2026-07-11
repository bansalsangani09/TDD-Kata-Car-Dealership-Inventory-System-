const ApiError = require("../utils/ApiError");
const { AUTH_MESSAGES, ROLES } = require("../constants/auth.constants");

/**
 * Admin Middleware
 * Restricts access to Admin role users only. Must be mounted after authMiddleware.
 */
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== ROLES.ADMIN) {
    return next(new ApiError(403, AUTH_MESSAGES.FORBIDDEN));
  }
  next();
};

module.exports = adminMiddleware;
