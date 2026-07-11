const { registerUser, loginUser } = require("../services/auth.service");
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

/**
 * POST /api/auth/login
 *
 * HTTP layer only — no business logic.
 * 1. Receives validated request body
 * 2. Delegates to auth.service.loginUser
 * 3. Sends a 200 success response
 * 4. Forwards errors to error middleware
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    sendSuccess(res, 200, AUTH_MESSAGES.LOGIN_SUCCESS, { user, token });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  // TODO: Implement in the logout feature prompt
};

module.exports = { register, login, logout };
