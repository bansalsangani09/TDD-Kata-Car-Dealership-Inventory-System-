const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");
const { AUTH_MESSAGES } = require("../constants/auth.constants");

/**
 * Registers a new user account.
 *
 * Responsibilities (Single Responsibility):
 *   1. Guard against duplicate email
 *   2. Persist the user (password hashing delegated to the User pre-save hook)
 *   3. Issue a JWT
 *   4. Return a sanitized user payload (password omitted via toJSON transform)
 *
 * @param {{ name: string, email: string, password: string }} data
 * @returns {{ user: object, token: string }}
 * @throws {ApiError} HTTP 400 when the email is already registered
 */
const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new ApiError(400, AUTH_MESSAGES.EMAIL_EXISTS);
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id.toString());

  return { user: user.toJSON(), token };
};

/**
 * Logins a user.
 *
 * Responsibilities (Single Responsibility):
 *   1. Fetch user by email
 *   2. Check password validity
 *   3. Issue a JWT
 *   4. Return a sanitized user payload (password omitted via toJSON transform)
 *
 * @param {{ email: string, password: string }} data
 * @returns {{ user: object, token: string }}
 * @throws {ApiError} HTTP 401 on invalid credentials
 */
const loginUser = async ({ email, password }) => {
  // Find user. Since password has select: false by default in some setups, we check User schema.
  // Actually, User schema did not set select: false for password, but toJSON strips it.
  // So User.findOne will retrieve password.
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(401, AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const token = generateToken(user._id.toString());
  return { user: user.toJSON(), token };
};

module.exports = { registerUser, loginUser };
