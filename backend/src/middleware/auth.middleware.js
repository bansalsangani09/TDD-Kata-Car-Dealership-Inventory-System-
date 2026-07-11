const jwt = require("jsonwebtoken");
const getJwtConfig = require("../config/jwt");
const prisma = require("../config/db");
const ApiError = require("../utils/ApiError");
const { AUTH_MESSAGES } = require("../constants/auth.constants");

/**
 * Auth Middleware
 * Verifies Authorization bearer token, decodes JWT, fetches user, and attaches to req.user.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, AUTH_MESSAGES.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];
    const { secret } = getJwtConfig();

    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      throw new ApiError(401, AUTH_MESSAGES.UNAUTHORIZED);
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });
    if (!user) {
      throw new ApiError(401, AUTH_MESSAGES.UNAUTHORIZED);
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      _id: user.id
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
