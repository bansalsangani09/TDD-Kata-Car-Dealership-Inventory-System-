const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
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

describe("GET /api/vehicles & /api/vehicles/search", () => {
  let userToken;

  beforeEach(async () => {
    // Create a regular user for queries
    const user = await User.create({
      name: "Reader User",
      email: "reader@example.com",
      password: "password123",
      role: "USER",
    });
    userToken = `Bearer ${generateToken(user._id.toString())}`;

    // Seed test vehicles
    await Vehicle.create([
      { make: "Toyota", model: "Camry", category: "Sedan", price: 25000, quantity: 5 },
      { make: "Honda", model: "Civic", category: "Sedan", price: 22000, quantity: 8 },
      { make: "Ford", model: "Explorer", category: "SUV", price: 35000, quantity: 3 },
    ]);
  });

  // ── GET /api/vehicles ──────────────────────────────────────────────────────
  test("should get all vehicles in inventory", async () => {
    const res = await request(app)
      .get("/api/vehicles")
      .set("Authorization", userToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(3);
  });

  // ── GET /api/vehicles/search ───────────────────────────────────────────────
  test("should search and filter by make", async () => {
    const res = await request(app)
      .get("/api/vehicles/search?make=Toyota")
      .set("Authorization", userToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].make).toBe("Toyota");
  });

  test("should search and filter by model", async () => {
    const res = await request(app)
      .get("/api/vehicles/search?model=Civic")
      .set("Authorization", userToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].model).toBe("Civic");
  });

  test("should search and filter by category", async () => {
    const res = await request(app)
      .get("/api/vehicles/search?category=Sedan")
      .set("Authorization", userToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(2); // Camry & Civic
  });

  test("should search and filter by price range", async () => {
    const res = await request(app)
      .get("/api/vehicles/search?minPrice=23000&maxPrice=30000")
      .set("Authorization", userToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1); // Camry (25000)
    expect(res.body.data[0].model).toBe("Camry");
  });

  test("should return empty list when no matches are found", async () => {
    const res = await request(app)
      .get("/api/vehicles/search?make=BMW")
      .set("Authorization", userToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(0);
  });
});

describe("POST /api/vehicles/:id/purchase", () => {
  let userToken;
  let testVehicle;
  let outOfStockVehicle;

  beforeEach(async () => {
    // Create a regular user
    const user = await User.create({
      name: "Buyer User",
      email: "buyer@example.com",
      password: "password123",
      role: "USER",
    });
    userToken = `Bearer ${generateToken(user._id.toString())}`;

    // Seed test vehicles
    testVehicle = await Vehicle.create({
      make: "Toyota",
      model: "Camry",
      category: "Sedan",
      price: 25000,
      quantity: 1, // Will become 0 after one purchase
    });

    outOfStockVehicle = await Vehicle.create({
      make: "Honda",
      model: "Civic",
      category: "Sedan",
      price: 22000,
      quantity: 0,
    });
  });

  // ── Test 1: Purchase successfully (Quantity decreases by one) ──────────────
  test("should purchase a vehicle successfully and decrease quantity by one", async () => {
    const res = await request(app)
      .post(`/api/vehicles/${testVehicle._id}/purchase`)
      .set("Authorization", userToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.quantity).toBe(0); // 1 -> 0
  });

  // ── Test 2: Cannot purchase when quantity is zero ──────────────────────────
  test("should return 400 when vehicle is out of stock", async () => {
    const res = await request(app)
      .post(`/api/vehicles/${outOfStockVehicle._id}/purchase`)
      .set("Authorization", userToken);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Vehicle out of stock");
  });

  // ── Test 3: JWT required ───────────────────────────────────────────────────
  test("should return 401 when no token is provided", async () => {
    const res = await request(app)
      .post(`/api/vehicles/${testVehicle._id}/purchase`);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  // ── Test 4: Handle missing vehicle ─────────────────────────────────────────
  test("should return 404 when vehicle does not exist", async () => {
    // Generate a valid ObjectId but one that doesn't exist
    const nonExistentId = new (require("mongoose").Types.ObjectId)();
    const res = await request(app)
      .post(`/api/vehicles/${nonExistentId}/purchase`)
      .set("Authorization", userToken);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Vehicle not found");
  });

  // ── Test 5: Handle invalid vehicle ID format ─────────────────────────────────
  test("should return 400 when vehicle ID format is invalid", async () => {
    const res = await request(app)
      .post("/api/vehicles/invalid-id-format/purchase")
      .set("Authorization", userToken);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid vehicle ID format");
  });
});

describe("POST /api/vehicles/:id/restock", () => {
  let adminToken;
  let userToken;
  let testVehicle;

  beforeEach(async () => {
    // Create an Admin user
    const admin = await User.create({
      name: "Admin User",
      email: "admin.restock@example.com",
      password: "password123",
      role: "ADMIN",
    });
    adminToken = `Bearer ${generateToken(admin._id.toString())}`;

    // Create a regular user
    const user = await User.create({
      name: "Regular User",
      email: "user.restock@example.com",
      password: "password123",
      role: "USER",
    });
    userToken = `Bearer ${generateToken(user._id.toString())}`;

    // Seed test vehicle
    testVehicle = await Vehicle.create({
      make: "Toyota",
      model: "Camry",
      category: "Sedan",
      price: 25000,
      quantity: 5,
    });
  });

  // ── Test 1: Restock successfully (Admin only) ──────────────────────────────
  test("should restock a vehicle successfully and increase quantity by amount", async () => {
    const res = await request(app)
      .post(`/api/vehicles/${testVehicle._id}/restock`)
      .set("Authorization", adminToken)
      .send({ amount: 10 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.quantity).toBe(15); // 5 + 10 = 15
  });

  // ── Test 2: Non-admin trying to restock ────────────────────────────────────
  test("should return 403 when a non-admin tries to restock", async () => {
    const res = await request(app)
      .post(`/api/vehicles/${testVehicle._id}/restock`)
      .set("Authorization", userToken)
      .send({ amount: 10 });

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
  });

  // ── Test 3: Unauthorized user (no token) ───────────────────────────────────
  test("should return 401 when no token is provided", async () => {
    const res = await request(app)
      .post(`/api/vehicles/${testVehicle._id}/restock`)
      .send({ amount: 10 });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  // ── Test 4: Invalid restock amount (missing) ───────────────────────────────
  test("should return 400 when amount is missing", async () => {
    const res = await request(app)
      .post(`/api/vehicles/${testVehicle._id}/restock`)
      .set("Authorization", adminToken)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // ── Test 5: Invalid restock amount (negative) ──────────────────────────────
  test("should return 400 when amount is negative", async () => {
    const res = await request(app)
      .post(`/api/vehicles/${testVehicle._id}/restock`)
      .set("Authorization", adminToken)
      .send({ amount: -5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // ── Test 6: Invalid restock amount (non-integer) ───────────────────────────
  test("should return 400 when amount is not an integer", async () => {
    const res = await request(app)
      .post(`/api/vehicles/${testVehicle._id}/restock`)
      .set("Authorization", adminToken)
      .send({ amount: 3.5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // ── Test 7: Handle missing vehicle ─────────────────────────────────────────
  test("should return 404 when vehicle does not exist", async () => {
    const nonExistentId = new (require("mongoose").Types.ObjectId)();
    const res = await request(app)
      .post(`/api/vehicles/${nonExistentId}/restock`)
      .set("Authorization", adminToken)
      .send({ amount: 5 });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Vehicle not found");
  });

  // ── Test 8: Handle invalid vehicle ID format ─────────────────────────────────
  test("should return 400 when vehicle ID format is invalid", async () => {
    const res = await request(app)
      .post("/api/vehicles/invalid-id-format/restock")
      .set("Authorization", adminToken)
      .send({ amount: 5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid vehicle ID format");
  });
});

describe("PUT /api/vehicles/:id", () => {
  let adminToken;
  let userToken;
  let testVehicle;

  beforeEach(async () => {
    // Create an Admin user
    const admin = await User.create({
      name: "Admin User",
      email: "admin.put@example.com",
      password: "password123",
      role: "ADMIN",
    });
    adminToken = `Bearer ${generateToken(admin._id.toString())}`;

    // Create a regular user
    const user = await User.create({
      name: "Regular User",
      email: "user.put@example.com",
      password: "password123",
      role: "USER",
    });
    userToken = `Bearer ${generateToken(user._id.toString())}`;

    // Seed test vehicle
    testVehicle = await Vehicle.create({
      make: "Toyota",
      model: "Camry",
      category: "Sedan",
      price: 25000,
      quantity: 5,
    });
  });

  test("should update a vehicle successfully when requested by Admin", async () => {
    const res = await request(app)
      .put(`/api/vehicles/${testVehicle._id}`)
      .set("Authorization", adminToken)
      .send({ price: 27000, model: "Camry Hybrid" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.price).toBe(27000);
    expect(res.body.data.model).toBe("Camry Hybrid");
    expect(res.body.data.make).toBe("Toyota"); // unchanged
  });

  test("should return 403 when a non-admin tries to update a vehicle", async () => {
    const res = await request(app)
      .put(`/api/vehicles/${testVehicle._id}`)
      .set("Authorization", userToken)
      .send({ price: 27000 });

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
  });

  test("should return 401 when no token is provided", async () => {
    const res = await request(app)
      .put(`/api/vehicles/${testVehicle._id}`)
      .send({ price: 27000 });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test("should return 400 validation error when price is negative", async () => {
    const res = await request(app)
      .put(`/api/vehicles/${testVehicle._id}`)
      .set("Authorization", adminToken)
      .send({ price: -100 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("should return 400 validation error when quantity is not an integer", async () => {
    const res = await request(app)
      .put(`/api/vehicles/${testVehicle._id}`)
      .set("Authorization", adminToken)
      .send({ quantity: 2.5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("should return 400 validation error when quantity is negative", async () => {
    const res = await request(app)
      .put(`/api/vehicles/${testVehicle._id}`)
      .set("Authorization", adminToken)
      .send({ quantity: -5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("should return 404 when vehicle does not exist", async () => {
    const nonExistentId = new (require("mongoose").Types.ObjectId)();
    const res = await request(app)
      .put(`/api/vehicles/${nonExistentId}`)
      .set("Authorization", adminToken)
      .send({ price: 30000 });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Vehicle not found");
  });

  test("should return 400 when vehicle ID format is invalid", async () => {
    const res = await request(app)
      .put("/api/vehicles/invalid-id-format")
      .set("Authorization", adminToken)
      .send({ price: 30000 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid vehicle ID format");
  });
});

describe("DELETE /api/vehicles/:id", () => {
  let adminToken;
  let userToken;
  let testVehicle;

  beforeEach(async () => {
    // Create an Admin user
    const admin = await User.create({
      name: "Admin User",
      email: "admin.delete@example.com",
      password: "password123",
      role: "ADMIN",
    });
    adminToken = `Bearer ${generateToken(admin._id.toString())}`;

    // Create a regular user
    const user = await User.create({
      name: "Regular User",
      email: "user.delete@example.com",
      password: "password123",
      role: "USER",
    });
    userToken = `Bearer ${generateToken(user._id.toString())}`;

    // Seed test vehicle
    testVehicle = await Vehicle.create({
      make: "Toyota",
      model: "Camry",
      category: "Sedan",
      price: 25000,
      quantity: 5,
    });
  });

  test("should delete a vehicle successfully when requested by Admin", async () => {
    const res = await request(app)
      .delete(`/api/vehicles/${testVehicle._id}`)
      .set("Authorization", adminToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    
    // Check database to ensure it's deleted
    const vehicleInDb = await Vehicle.findById(testVehicle._id);
    expect(vehicleInDb).toBeNull();
  });

  test("should return 403 when a non-admin tries to delete a vehicle", async () => {
    const res = await request(app)
      .delete(`/api/vehicles/${testVehicle._id}`)
      .set("Authorization", userToken);

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
  });

  test("should return 401 when no token is provided", async () => {
    const res = await request(app)
      .delete(`/api/vehicles/${testVehicle._id}`);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test("should return 404 when vehicle does not exist", async () => {
    const nonExistentId = new (require("mongoose").Types.ObjectId)();
    const res = await request(app)
      .delete(`/api/vehicles/${nonExistentId}`)
      .set("Authorization", adminToken);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Vehicle not found");
  });

  test("should return 400 when vehicle ID format is invalid", async () => {
    const res = await request(app)
      .delete("/api/vehicles/invalid-id-format")
      .set("Authorization", adminToken);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid vehicle ID format");
  });
});



