/**
 * Vehicle Controller
 * TODO: Implement CRUD handlers for vehicle resource
 */

const vehicleService = require("../services/vehicle.service");
const { sendSuccess } = require("../utils/response");

const getAllVehicles = async (req, res, next) => {
  // TODO: Return all vehicles
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

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
