const router = require("express").Router();
const { createVehicle } = require("../controllers/vehicle.controller");
const { createVehicleValidation } = require("../validators/vehicle.validator");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const validate = require("../middleware/validate.middleware");

// POST /api/vehicles - Admin only
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createVehicleValidation,
  validate,
  createVehicle
);

module.exports = router;
