import api from "./axios";

/**
 * POST /api/auth/register
 * @param {{ name: string, email: string, password: string }} data
 */
export const registerApi = (data) => api.post("/auth/register", data);

/**
 * POST /api/auth/login
 * @param {{ email: string, password: string }} data
 */
export const loginApi = (data) => api.post("/auth/login", data);
