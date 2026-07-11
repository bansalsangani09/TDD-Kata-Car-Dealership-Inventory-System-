/**
 * Application-wide constants.
 * Single source of truth for magic strings used across models, services, and responses.
 */

// ─── User Roles ────────────────────────────────────────────────────────────────
const ROLES = Object.freeze({
  USER: "USER",
  ADMIN: "ADMIN",
});

// ─── Auth Messages ─────────────────────────────────────────────────────────────
const AUTH_MESSAGES = Object.freeze({
  REGISTER_SUCCESS: "User registered successfully",
  EMAIL_EXISTS: "Email already exists",
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "Not authorized, no token provided",
  FORBIDDEN: "Access denied: insufficient permissions",
});

module.exports = { ROLES, AUTH_MESSAGES };
