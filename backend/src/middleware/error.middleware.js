/**
 * Global Error Middleware
 * TODO: Implement centralized error handling
 * - Handle ApiError instances
 * - Handle Mongoose validation errors
 * - Handle JWT errors
 * - Return consistent error response shape
 */

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    // TODO: Add stack trace in development mode only
  });
};

module.exports = errorMiddleware;
