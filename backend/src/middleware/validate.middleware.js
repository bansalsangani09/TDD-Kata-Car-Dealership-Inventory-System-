const { validationResult } = require("express-validator");

/**
 * Validate Middleware
 * Runs express-validator results and returns 422 on failure.
 * TODO: Expand error formatting as needed
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
