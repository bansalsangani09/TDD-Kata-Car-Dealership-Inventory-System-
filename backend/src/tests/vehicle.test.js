const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

describe("POST /api/vehicles", () => {
  let adminToken;
  let userToken;

  beforeEach(async () => {
    // Create an Admin user
    const admin = await User.create({
      name: "Admin User",
      email: "admin.vehicle@example.com",
      password: "password123",
      role: "ADMIN",
    });
    adminToken = `Bearer ${generateToken(admin._id.toString())}`;

    // Create a regular User
    const user = await User.create({
      name: "Regular User",
      email: "user.vehicle@example.com",
      password: "password123",
      role: "USER",
    });
    userToken = `Bearer ${generateToken(user._id.toString())}`;
  });

  const validVehicle = {
    make: "Toyota",
    model: "Camry",
    category: "Sedan",
    price: 25000,
    quantity: 5,
  };

  // ── Test 1: Create vehicle successfully (Admin only) ──────────────────────
  test("should create a vehicle successfully when requested by Admin", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .set("Authorization", adminToken)
      .send(validVehicle);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.make).toBe(validVehicle.make);
    expect(res.body.data.model).toBe(validVehicle.model);
    expect(res.body.data.category).toBe(validVehicle.category);
    expect(res.body.data.price).toBe(validVehicle.price);
    expect(res.body.data.quantity).toBe(validVehicle.quantity);
  });

  // ── Test 2: Unauthorized user (non-admin) ──────────────────────────────────
  test("should return 403 when a non-admin tries to create a vehicle", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .set("Authorization", userToken)
      .send(validVehicle);

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
  });

  // ── Test 3: Unauthorized user (no token) ───────────────────────────────────
  test("should return 401 when no token is provided", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .send(validVehicle);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  // ── Test 4: Missing fields ─────────────────────────────────────────────────
  test("should return 400 validation error when fields are missing", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .set("Authorization", adminToken)
      .send({
        make: "Toyota",
        model: "Camry",
        // category, price, quantity missing
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // ── Test 5: Invalid price ──────────────────────────────────────────────────
  test("should return 400 validation error when price is negative", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .set("Authorization", adminToken)
      .send({
        ...validVehicle,
        price: -100,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // ── Test 6: Invalid quantity ───────────────────────────────────────────────
  test("should return 400 validation error when quantity is not an integer", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .set("Authorization", adminToken)
      .send({
        ...validVehicle,
        quantity: 2.5,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("should return 400 validation error when quantity is negative", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .set("Authorization", adminToken)
      .send({
        ...validVehicle,
        quantity: -5,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
