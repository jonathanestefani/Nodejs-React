module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  // collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
