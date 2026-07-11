/**
 * Vehicle Controller
 * TODO: Implement CRUD handlers for vehicle resource
 */

const vehicleService = require("../services/vehicle.service");
const inventoryService = require("../services/inventory.service");
const { sendSuccess } = require("../utils/response");

const getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getVehicles();
    sendSuccess(res, 200, "Vehicles retrieved successfully", vehicles);
  } catch (err) {
    next(err);
  }
};

const searchVehicles = async (req, res, next) => {
  try {
    const { make, model, category, minPrice, maxPrice } = req.query;
    const vehicles = await vehicleService.searchVehicles({
      make,
      model,
      category,
      minPrice,
      maxPrice,
    });
    sendSuccess(res, 200, "Vehicles searched successfully", vehicles);
  } catch (err) {
    next(err);
  }
};

const getVehicleById = async (req, res, next) => {
  // TODO: Return a single vehicle by ID
};

const createVehicle = async (req, res, next) => {
  try {
    const { make, model, category, price, quantity } = req.body;
    const vehicle = await vehicleService.createVehicle({
      make,
      model,
      category,
      price,
      quantity,
    });
    sendSuccess(res, 201, "Vehicle created successfully", vehicle);
  } catch (err) {
    next(err);
  }
};

const updateVehicle = async (req, res, next) => {
  // TODO: Update an existing vehicle
};

const deleteVehicle = async (req, res, next) => {
  // TODO: Delete a vehicle
};

const purchaseVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await inventoryService.purchaseVehicle(id);
    sendSuccess(res, 200, "Vehicle purchased successfully", vehicle);
  } catch (err) {
    next(err);
  }
};

const restockVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const vehicle = await inventoryService.restockVehicle(id, amount);
    sendSuccess(res, 200, "Vehicle restocked successfully", vehicle);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllVehicles,
  searchVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
};
