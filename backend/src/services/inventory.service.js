const prisma = require("../config/db");
const ApiError = require("../utils/ApiError");

/**
 * Reusable UUID validator check
 */
const isValidUuid = (id) => {
  return typeof id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
};

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
  if (!isValidUuid(vehicleId)) {
    throw new ApiError(400, "Invalid vehicle ID format");
  }

  return await prisma.$transaction(async (tx) => {
    const vehicle = await tx.vehicle.findUnique({
      where: { id: vehicleId }
    });

    if (!vehicle) {
      throw new ApiError(404, "Vehicle not found");
    }

    if (vehicle.quantity <= 0) {
      throw new ApiError(400, "Vehicle out of stock");
    }

    const updated = await tx.vehicle.update({
      where: { id: vehicleId },
      data: { quantity: vehicle.quantity - 1 }
    });

    return {
      ...updated,
      _id: updated.id
    };
  });
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
  if (!isValidUuid(vehicleId)) {
    throw new ApiError(400, "Invalid vehicle ID format");
  }

  const parsedAmount = Number(amount);
  if (amount === undefined || isNaN(parsedAmount) || !Number.isInteger(parsedAmount) || parsedAmount <= 0) {
    throw new ApiError(400, "Invalid restock amount");
  }

  return await prisma.$transaction(async (tx) => {
    const vehicle = await tx.vehicle.findUnique({
      where: { id: vehicleId }
    });

    if (!vehicle) {
      throw new ApiError(404, "Vehicle not found");
    }

    const updated = await tx.vehicle.update({
      where: { id: vehicleId },
      data: { quantity: vehicle.quantity + parsedAmount }
    });

    return {
      ...updated,
      _id: updated.id
    };
  });
};

module.exports = {
  purchaseVehicle,
  restockVehicle,
};
