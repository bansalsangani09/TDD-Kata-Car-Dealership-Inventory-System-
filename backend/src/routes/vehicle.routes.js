const router = require("express").Router();
const {
  createVehicle,
  getAllVehicles,
  searchVehicles,
  purchaseVehicle,
  restockVehicle,
} = require("../controllers/vehicle.controller");
const {
  createVehicleValidation,
  restockVehicleValidation,
} = require("../validators/vehicle.validator");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const validate = require("../middleware/validate.middleware");

// GET /api/vehicles/search - Search/filter vehicles
router.get("/search", authMiddleware, searchVehicles);

// GET /api/vehicles - Get all vehicles
router.get("/", authMiddleware, getAllVehicles);

// POST /api/vehicles - Create vehicle (Admin only)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createVehicleValidation,
  validate,
  createVehicle
);

// POST /api/vehicles/:id/purchase - Purchase vehicle (Any authenticated user)
router.post("/:id/purchase", authMiddleware, purchaseVehicle);

// POST /api/vehicles/:id/restock - Restock vehicle (Admin only)
router.post(
  "/:id/restock",
  authMiddleware,
  adminMiddleware,
  restockVehicleValidation,
  validate,
  restockVehicle
);

module.exports = router;
