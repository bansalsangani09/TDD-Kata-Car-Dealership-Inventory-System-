const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");
const { AUTH_MESSAGES } = require("../constants/auth.constants");

/**
 * Sanitizes the user object by removing sensitive fields (password)
 * and adding a Mongoose-compatible _id property.
 */
const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...rest } = user;
  return {
    ...rest,
    _id: user.id,
  };
};

/**
 * Registers a new user account.
 *
 * @param {{ name: string, email: string, password: string }} data
 * @returns {{ user: object, token: string }}
 * @throws {ApiError} HTTP 400 when the email is already registered
 */
const registerUser = async ({ name, email, password }) => {
  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (existing) {
    throw new ApiError(400, AUTH_MESSAGES.EMAIL_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    },
  });

  const sanitized = sanitizeUser(user);
  const token = generateToken(sanitized);

  return { user: sanitized, token };
};

/**
 * Logins a user.
 *
 * @param {{ email: string, password: string }} data
 * @returns {{ user: object, token: string }}
 * @throws {ApiError} HTTP 401 on invalid credentials
 */
const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (!user) {
    throw new ApiError(401, AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const sanitized = sanitizeUser(user);
  const token = generateToken(sanitized);

  return { user: sanitized, token };
};

module.exports = { registerUser, loginUser };
