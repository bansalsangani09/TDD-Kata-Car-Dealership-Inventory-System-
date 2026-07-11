const { validationResult } = require("express-validator");

/**
 * Validate Middleware
 *
 * Collects express-validator errors accumulated by preceding validation chains
 * and short-circuits the request with HTTP 400 when any rule fails.
 * Returns the full error array so the client can show field-level messages.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = validate;
