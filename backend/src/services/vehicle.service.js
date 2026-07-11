const Vehicle = require("../models/Vehicle");

/**
 * Creates a new vehicle record.
 *
 * @param {{ make: string, model: string, category: string, price: number, quantity: number }} vehicleData
 * @returns {Promise<object>} The created vehicle document
 */
const createVehicle = async (vehicleData) => {
  return await Vehicle.create(vehicleData);
};

module.exports = {
  createVehicle,
};
