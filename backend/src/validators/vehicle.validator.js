// TODO: Define express-validator rules for vehicle endpoints
// - createVehicleValidation: make, model, year, vin, price, mileage, color, stock
// - updateVehicleValidation: same fields but optional

const createVehicleValidation = [
  // TODO: Validate make (required, string)
  // TODO: Validate model (required, string)
  // TODO: Validate year (required, integer, range 1900–current year)
  // TODO: Validate vin (required, unique string)
  // TODO: Validate price (required, positive number)
  // TODO: Validate stock (required, non-negative integer)
];

const updateVehicleValidation = [
  // TODO: Same as createVehicleValidation but all fields optional
];

module.exports = { createVehicleValidation, updateVehicleValidation };
