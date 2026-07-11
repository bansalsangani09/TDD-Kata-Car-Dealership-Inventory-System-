const { body } = require("express-validator");

const createVehicleValidation = [
  body("make")
    .trim()
    .notEmpty()
    .withMessage("Make is required"),

  body("model")
    .trim()
    .notEmpty()
    .withMessage("Model is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0"),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer greater than or equal to 0"),
];

const updateVehicleValidation = [
  body("make")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Make cannot be empty"),

  body("model")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Model cannot be empty"),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0"),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer greater than or equal to 0"),
];

const restockVehicleValidation = [
  body("amount")
    .notEmpty()
    .withMessage("Restock amount is required")
    .isInt({ min: 1 })
    .withMessage("Restock amount must be an integer greater than 0"),
];

module.exports = {
  createVehicleValidation,
  updateVehicleValidation,
  restockVehicleValidation,
};
