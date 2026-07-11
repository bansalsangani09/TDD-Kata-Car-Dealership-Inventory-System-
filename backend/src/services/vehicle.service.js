const prisma = require("../config/db");
const ApiError = require("../utils/ApiError");
const { buildVehicleQuery } = require("../utils/queryBuilder");

/**
 * Reusable UUID validator
 */
const validateUuid = (id, resourceName = "Vehicle") => {
  if (!id || typeof id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    throw new ApiError(400, `Invalid ${resourceName.toLowerCase()} ID format`);
  }
};

/**
 * Compatibility mapper adding _id for Mongoose backward compatibility
 */
const sanitizeVehicle = (vehicle) => {
  if (!vehicle) return null;
  return {
    ...vehicle,
    _id: vehicle.id,
  };
};

const sanitizeVehicles = (vehicles) => {
  return vehicles.map(sanitizeVehicle);
};

const getDocumentById = async (Model, id, resourceName = "Vehicle") => {
  validateUuid(id, resourceName);
  const document = await prisma.vehicle.findUnique({
    where: { id },
  });
  if (!document) {
    throw new ApiError(404, `${resourceName} not found`);
  }
  return sanitizeVehicle(document);
};

const createVehicle = async (vehicleData) => {
  const vehicle = await prisma.vehicle.create({
    data: vehicleData,
  });
  return sanitizeVehicle(vehicle);
};

const getVehicles = async () => {
  const vehicles = await prisma.vehicle.findMany();
  return sanitizeVehicles(vehicles);
};

const searchVehicles = async (filters) => {
  const query = buildVehicleQuery(filters);
  const vehicles = await prisma.vehicle.findMany({
    where: query,
  });
  return sanitizeVehicles(vehicles);
};

const updateVehicle = async (id, updateData) => {
  validateUuid(id, "Vehicle");
  const existing = await prisma.vehicle.findUnique({
    where: { id },
  });
  if (!existing) {
    throw new ApiError(404, "Vehicle not found");
  }

  const vehicle = await prisma.vehicle.update({
    where: { id },
    data: updateData,
  });
  return sanitizeVehicle(vehicle);
};

const deleteVehicle = async (id) => {
  validateUuid(id, "Vehicle");
  const existing = await prisma.vehicle.findUnique({
    where: { id },
  });
  if (!existing) {
    throw new ApiError(404, "Vehicle not found");
  }

  const vehicle = await prisma.vehicle.delete({
    where: { id },
  });
  return sanitizeVehicle(vehicle);
};

module.exports = {
  createVehicle,
  getVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  getDocumentById,
};
