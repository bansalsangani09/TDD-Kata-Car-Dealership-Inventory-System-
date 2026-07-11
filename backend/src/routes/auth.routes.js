const router = require("express").Router();
const { register, login } = require("../controllers/auth.controller");
const { registerValidation, loginValidation } = require("../validators/auth.validator");
const validate = require("../middleware/validate.middleware");

// POST /api/auth/register
router.post("/register", registerValidation, validate, register);

// POST /api/auth/login
router.post("/login", loginValidation, validate, login);

// TODO: POST /api/auth/logout

module.exports = router;
