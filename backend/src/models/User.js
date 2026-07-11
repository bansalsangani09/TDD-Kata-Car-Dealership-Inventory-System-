const mongoose = require("mongoose");

// TODO: Define User schema
// Fields to include: name, email, password, role, createdAt, updatedAt

const userSchema = new mongoose.Schema({}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
