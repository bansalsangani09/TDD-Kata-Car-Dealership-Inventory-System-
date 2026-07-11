process.env.DATABASE_URL = "postgresql://postgres:Sau@1610@localhost:5432/car_dealership_test";
process.env.JWT_SECRET = "test_jwt_secret_key";
process.env.JWT_EXPIRES_IN = "1d";

const prisma = require("../config/db");

beforeAll(async () => {
  await prisma.$connect();
});

/**
 * Drop all collections between tests so each test starts with a clean slate.
 */
afterEach(async () => {
  await prisma.user.deleteMany({});
  await prisma.vehicle.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});
