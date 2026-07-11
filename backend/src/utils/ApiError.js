/**
 * ApiError - Custom error class for operational API errors.
 * TODO: Extend with additional properties as needed (e.g., errors array for validation)
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

module.exports = ApiError;
