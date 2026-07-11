const { registerUser } = require("../services/auth.service");
const { sendSuccess } = require("../utils/response");
const { AUTH_MESSAGES } = require("../constants/auth.constants");

/**
 * POST /api/auth/register
 *
 * HTTP layer only — no business logic.
 * 1. Receives validated request body (validation runs before this handler)
 * 2. Delegates to auth.service.registerUser
 * 3. Sends a 201 success response
 * 4. Forwards any thrown errors to the global error middleware via next()
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerUser({ name, email, password });
    sendSuccess(res, 201, AUTH_MESSAGES.REGISTER_SUCCESS, { user, token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  // TODO: Implement in the login feature prompt
};

const logout = async (req, res, next) => {
  // TODO: Implement in the logout feature prompt
};

module.exports = { register, login, logout };
