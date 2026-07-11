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
  // TODO: Same as createVehicleValidation but all fields optional
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
