module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  // Runs after Jest is installed — beforeAll/afterAll hooks are available here
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.js"],
  // MongoMemoryServer can take time on first download
  testTimeout: 120000,
};
