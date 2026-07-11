const mongoose = require("mongoose");
const Vehicle = require("../models/Vehicle");
const ApiError = require("../utils/ApiError");
const crudHelper = require("../utils/crudHelper");

/**
 * Purchases a vehicle by decrementing its quantity by 1.
 * Ensures the vehicle exists, has a valid ID format, and is in stock.
 *
 * @param {string} vehicleId - The ID of the vehicle to purchase
 * @returns {Promise<object>} The updated vehicle document
 * @throws {ApiError} 400 if ID format is invalid or vehicle is out of stock
 * @throws {ApiError} 404 if vehicle is not found
 */
const purchaseVehicle = async (vehicleId) => {
  const vehicle = await crudHelper.getDocumentById(Vehicle, vehicleId, "Vehicle");

  if (vehicle.quantity <= 0) {
    throw new ApiError(400, "Vehicle out of stock");
  }

  vehicle.quantity -= 1;
  await vehicle.save();

  return vehicle;
};

/**
 * Restocks a vehicle by incrementing its quantity by a specified amount.
 * Ensures the vehicle exists, has a valid ID format, and restock amount is valid.
 *
 * @param {string} vehicleId - The ID of the vehicle to restock
 * @param {number} amount - The amount to restock (must be an integer > 0)
 * @returns {Promise<object>} The updated vehicle document
 * @throws {ApiError} 400 if ID format is invalid or amount is invalid
 * @throws {ApiError} 404 if vehicle is not found
 */
const restockVehicle = async (vehicleId, amount) => {
  const parsedAmount = Number(amount);
  if (amount === undefined || isNaN(parsedAmount) || !Number.isInteger(parsedAmount) || parsedAmount <= 0) {
    throw new ApiError(400, "Invalid restock amount");
  }

  const vehicle = await crudHelper.getDocumentById(Vehicle, vehicleId, "Vehicle");

  vehicle.quantity += parsedAmount;
  await vehicle.save();

  return vehicle;
};

module.exports = {
  purchaseVehicle,
  restockVehicle,
};
