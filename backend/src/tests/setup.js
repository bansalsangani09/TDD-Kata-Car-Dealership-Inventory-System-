const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongod;

/**
 * Start an in-memory MongoDB instance before the entire test suite.
 * Sets MONGO_URI and JWT env vars so app.js / server.js can consume them.
 *
 * Timeout raised to 120 s to accommodate the one-time MongoDB binary
 * download performed by mongodb-memory-server on first run.
 */
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  process.env.MONGO_URI = uri;
  process.env.JWT_SECRET = "test_jwt_secret_key";
  process.env.JWT_EXPIRES_IN = "1d";

  await mongoose.connect(uri);
}, 120000); // 2-minute timeout for first-run binary download

/**
 * Drop all collections between tests so each test starts with a clean slate.
 */
afterEach(async () => {
  if (mongoose.connection.readyState !== 1) return;
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

/**
 * Disconnect Mongoose and stop the in-memory server after all tests finish.
 */
afterAll(async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
});
