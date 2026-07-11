const mongoose = require("mongoose");
const Vehicle = require("../models/Vehicle");
const ApiError = require("../utils/ApiError");

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
  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    throw new ApiError(400, "Invalid vehicle ID format");
  }

  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  if (vehicle.quantity <= 0) {
    throw new ApiError(400, "Vehicle out of stock");
  }

  vehicle.quantity -= 1;
  await vehicle.save();

  return vehicle;
};

module.exports = {
  purchaseVehicle,
};
