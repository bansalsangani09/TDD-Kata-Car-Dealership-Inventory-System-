const request = require("supertest");
const app = require("../app");

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/register
// RED phase — all tests must FAIL until the feature is implemented.
// ─────────────────────────────────────────────────────────────────────────────

describe("POST /api/auth/register", () => {
  // ── Valid base payload ────────────────────────────────────────────────────
  const validUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "secret123",
  };

  // ── Test 1: Successful registration ──────────────────────────────────────
  test("should register a new user and return 201 with token (no password)", async () => {
    const res = await request(app).post("/api/auth/register").send(validUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);

    // user object is present
    expect(res.body.data).toBeDefined();
    expect(res.body.data.user).toBeDefined();
    expect(res.body.data.user.name).toBe(validUser.name);
    expect(res.body.data.user.email).toBe(validUser.email);

    // JWT token is returned
    expect(res.body.data.token).toBeDefined();
    expect(typeof res.body.data.token).toBe("string");

    // password must NOT be returned
    expect(res.body.data.user.password).toBeUndefined();
  });

  // ── Test 2: Duplicate email ───────────────────────────────────────────────
  test("should return 400 when email is already registered", async () => {
    // First registration succeeds
    await request(app).post("/api/auth/register").send(validUser);

    // Second registration with same email must fail
    const res = await request(app).post("/api/auth/register").send(validUser);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Email already exists");
  });

  // ── Test 3: Missing email ─────────────────────────────────────────────────
  test("should return 400 validation error when email is missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "John Doe", password: "secret123" });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // ── Test 4: Missing password ──────────────────────────────────────────────
  test("should return 400 validation error when password is missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "John Doe", email: "john.doe@example.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // ── Test 5: Password shorter than 6 characters ────────────────────────────
  test("should return 400 when password is shorter than 6 characters", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "John Doe",
      email: "short.pass@example.com",
      password: "abc",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // ── Test 6: Invalid email format ──────────────────────────────────────────
  test("should return 400 when email format is invalid", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "John Doe",
      email: "not-a-valid-email",
      password: "secret123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe("POST /api/auth/login", () => {
  const userCredentials = {
    email: "login.user@example.com",
    password: "password123",
  };

  const registerUserPayload = {
    name: "Login User",
    email: "login.user@example.com",
    password: "password123",
  };

  // ── Test 1: Login with valid credentials ──────────────────────────────────
  test("should login successfully and return 200 with token and user (no password)", async () => {
    // Register the user first
    await request(app).post("/api/auth/register").send(registerUserPayload);

    const res = await request(app)
      .post("/api/auth/login")
      .send(userCredentials);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.user).toBeDefined();
    expect(res.body.data.user.email).toBe(userCredentials.email);
    expect(res.body.data.token).toBeDefined();
    expect(typeof res.body.data.token).toBe("string");
    expect(res.body.data.user.password).toBeUndefined();
  });

  // ── Test 2: Wrong password ───────────────────────────────────────────────
  test("should return 401 when password is wrong", async () => {
    // Register the user first
    await request(app).post("/api/auth/register").send(registerUserPayload);

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: userCredentials.email,
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid email or password");
  });

  // ── Test 3: User not found ───────────────────────────────────────────────
  test("should return 401 when user is not found", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nonexistent@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Invalid email or password");
  });

  // ── Test 4: Missing email ─────────────────────────────────────────────────
  test("should return 400 validation error when email is missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ password: "password123" });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // ── Test 5: Missing password ──────────────────────────────────────────────
  test("should return 400 validation error when password is missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "login.user@example.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // ── Test 6: Invalid email format ──────────────────────────────────────────
  test("should return 400 when email format is invalid", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "not-a-valid-email",
        password: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

