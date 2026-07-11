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
// TODO: Register application routes here

// ─── Global Error Middleware ───────────────────────────────────────────────────
app.use(errorMiddleware);

module.exports = app;
