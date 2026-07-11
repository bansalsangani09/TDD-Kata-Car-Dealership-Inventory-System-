const Vehicle = require("../models/Vehicle");
const { buildVehicleQuery } = require("../utils/queryBuilder");

/**
 * Creates a new vehicle record.
 *
 * @param {{ make: string, model: string, category: string, price: number, quantity: number }} vehicleData
 * @returns {Promise<object>} The created vehicle document
 */
const createVehicle = async (vehicleData) => {
  return await Vehicle.create(vehicleData);
};

/**
 * Retrieves all vehicles in the inventory.
 *
 * @returns {Promise<Array>} List of all vehicle documents
 */
const getVehicles = async () => {
  return await Vehicle.find({});
};

/**
 * Searches and filters vehicles based on input query parameters.
 *
 * @param {object} filters - The search filter fields
 * @returns {Promise<Array>} List of matching vehicle documents
 */
const searchVehicles = async (filters) => {
  const query = buildVehicleQuery(filters);
  return await Vehicle.find(query);
};

module.exports = {
  createVehicle,
  getVehicles,
  searchVehicles,
};
