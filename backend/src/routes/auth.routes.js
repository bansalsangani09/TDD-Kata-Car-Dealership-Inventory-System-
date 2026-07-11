const router = require("express").Router();
const { register } = require("../controllers/auth.controller");
const { registerValidation } = require("../validators/auth.validator");
const validate = require("../middleware/validate.middleware");

// POST /api/auth/register
router.post("/register", registerValidation, validate, register);

// TODO: POST /api/auth/login
// TODO: POST /api/auth/logout

module.exports = router;
