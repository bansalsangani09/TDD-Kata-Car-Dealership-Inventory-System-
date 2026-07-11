const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");

/**
 * Registers a new user.
 *
 * @param {{ name: string, email: string, password: string }} data
 * @returns {{ user: object, token: string }}
 * @throws {ApiError} 400 if the email is already in use
 */
const registerUser = async ({ name, email, password }) => {
  // Guard: duplicate email
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new ApiError(400, "Email already exists");
  }

  // Persist — password hashing is handled by the pre-save hook in User model
  const user = await User.create({ name, email, password });

  // Generate JWT
  const token = generateToken(user._id.toString());

  // user.toJSON() automatically strips the password field
  return { user: user.toJSON(), token };
};

module.exports = { registerUser };
