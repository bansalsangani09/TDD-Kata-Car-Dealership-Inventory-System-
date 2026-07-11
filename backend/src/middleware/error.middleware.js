/**
 * Global Error Middleware
 *
 * Centralised error handler for all routes. Express recognises this as an
 * error-handling middleware because it has exactly four parameters (err, req, res, next).
 *
 * Behaviour:
 *  - ApiError (isOperational = true): returns the exact statusCode and message
 *  - Unexpected errors: returns 500 with a generic message to avoid leaking internals
 *  - In development: attaches the stack trace to the response for easier debugging
 */

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const isOperational = err.isOperational === true;
  const statusCode = isOperational ? err.statusCode : 500;
  const message = isOperational ? err.message : "Internal Server Error";

  const body = { success: false, message };

  if (process.env.NODE_ENV === "development" && !isOperational) {
    body.stack = err.stack;
  }

  res.status(statusCode).json(body);
};

module.exports = errorMiddleware;
