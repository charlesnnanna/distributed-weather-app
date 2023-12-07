// jest.config.js
module.exports = {
  // Specify the test environment
  testEnvironment: 'node',

  // Specify the test file patterns
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',

  // Modules that run some code before each test
  // setupFiles: ['<rootDir>/jest.setup.js'],

  // Transform files before running tests
  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  // Directories that Jest should use to search for files
  roots: ['<rootDir>/__tests__'],

  maxWorkers: 2,

  // Collect coverage information
  collectCoverage: true,

  // Specify the coverage directory
  coverageDirectory: '<rootDir>/coverage',

  // Specify coverage thresholds
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },

  // Other Jest configuration options can be added as needed
};
