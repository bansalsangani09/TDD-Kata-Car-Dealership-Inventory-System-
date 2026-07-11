const Vehicle = require("../models/Vehicle");
const { buildVehicleQuery } = require("../utils/queryBuilder");
const crudHelper = require("../utils/crudHelper");

/**
 * Creates a new vehicle record.
 *
 * @param {{ make: string, model: string, category: string, price: number, quantity: number }} vehicleData
 * @returns {Promise<object>} The created vehicle document
 */
const createVehicle = async (vehicleData) => {
  return await crudHelper.createDocument(Vehicle, vehicleData);
};

/**
 * Retrieves all vehicles in the inventory.
 *
 * @returns {Promise<Array>} List of all vehicle documents
 */
const getVehicles = async () => {
  return await crudHelper.getAllDocuments(Vehicle);
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

/**
 * Updates an existing vehicle record.
 *
 * @param {string} id
 * @param {object} updateData
 * @returns {Promise<object>} The updated vehicle document
 */
const updateVehicle = async (id, updateData) => {
  return await crudHelper.updateDocument(Vehicle, id, updateData, "Vehicle");
};

/**
 * Deletes an existing vehicle record.
 *
 * @param {string} id
 * @returns {Promise<object>} The deleted vehicle document
 */
const deleteVehicle = async (id) => {
  return await crudHelper.deleteDocument(Vehicle, id, "Vehicle");
};

module.exports = {
  createVehicle,
  getVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
};
