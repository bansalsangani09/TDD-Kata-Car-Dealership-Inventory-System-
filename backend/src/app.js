const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// ─── Core Middleware ───────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Car Dealership Inventory API Running" });
});

// ─── Application Routes ────────────────────────────────────────────────────────
const authRoutes = require("./routes/auth.routes");
const vehicleRoutes = require("./routes/vehicle.routes");

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

// ─── Global Error Middleware ───────────────────────────────────────────────────
app.use(errorMiddleware);

module.exports = app;
