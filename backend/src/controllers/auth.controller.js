const { registerUser } = require("../services/auth.service");
const { sendSuccess } = require("../utils/response");

/**
 * POST /api/auth/register
 * Thin controller: validates → delegates to service → sends response.
 * All business logic lives in auth.service.js.
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerUser({ name, email, password });

    sendSuccess(res, 201, "User registered successfully", { user, token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  // TODO: Implement login
};

const logout = async (req, res, next) => {
  // TODO: Implement logout
};

module.exports = { register, login, logout };
