const mongoose = require("mongoose");

// TODO: Define Vehicle schema
// Fields to include: make, model, year, vin, price, mileage, color, status, stock, createdAt, updatedAt

const vehicleSchema = new mongoose.Schema({}, { timestamps: true });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
