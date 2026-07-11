/**
 * ApiError — Represents an expected, operational HTTP error.
 *
 * Using `isOperational = true` allows the global error middleware to distinguish
 * intentional API errors (e.g. 400 Bad Request) from unexpected programmer errors
 * (e.g. null dereferences), which should result in a generic 500 response.
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code to return
   * @param {string} message    - Human-readable error description
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
    this.isOperational = true;
  }
}

module.exports = ApiError;
