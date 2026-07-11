import api from "./axios";

/**
 * GET /api/vehicles
 */
export const getAllVehicles = () => api.get("/vehicles");

/**
 * GET /api/vehicles/search?make=&model=&category=&minPrice=&maxPrice=
 * @param {object} filters
 */
export const searchVehicles = (filters) =>
  api.get("/vehicles/search", { params: filters });

/**
 * POST /api/vehicles  (Admin only)
 * @param {{ make, model, category, price, quantity }} data
 */
export const createVehicle = (data) => api.post("/vehicles", data);

/**
 * PUT /api/vehicles/:id  (Admin only)
 * @param {string} id
 * @param {object} data
 */
export const updateVehicle = (id, data) => api.put(`/vehicles/${id}`, data);

/**
 * DELETE /api/vehicles/:id  (Admin only)
 * @param {string} id
 */
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);

/**
 * POST /api/vehicles/:id/purchase
 * @param {string} id
 */
export const purchaseVehicle = (id) => api.post(`/vehicles/${id}/purchase`);

/**
 * POST /api/vehicles/:id/restock  (Admin only)
 * @param {string} id
 * @param {{ amount: number }} data
 */
export const restockVehicle = (id, amount) =>
  api.post(`/vehicles/${id}/restock`, { amount });
